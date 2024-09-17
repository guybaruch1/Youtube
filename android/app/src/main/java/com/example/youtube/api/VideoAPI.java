package com.example.youtube.api;

import android.util.Log;
import android.widget.Toast;

import androidx.lifecycle.MutableLiveData;

import com.example.youtube.model.RecommendationsResponse;
import com.example.youtube.model.VideoSession;
import com.example.youtube.room.VideoDao;
import com.example.youtube.utils.RetrofitInstance;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;

public class VideoAPI {
    private static final String TAG = VideoAPI.class.getSimpleName();
    VideoApiService apiService;
    Retrofit retrofit;
    private MutableLiveData<List<VideoSession>> videoListData;
    private VideoDao videoDao;

    // Original constructor
    public VideoAPI() {
        apiService = RetrofitInstance.getRetrofitInstance().create(VideoApiService.class);
    }

    // Constructor overload to match the android development powerpoint
    public VideoAPI(MutableLiveData<List<VideoSession>> videoListData, VideoDao videoDao) {
        this.videoListData = videoListData;
        apiService = RetrofitInstance.getRetrofitInstance().create(VideoApiService.class);
        this.videoDao = videoDao;
    }

    // getMostViewedAndRandomVideos overload to match the android development powerpoint
    public void getMostViewedAndRandomVideos(MutableLiveData<List<VideoSession>> videos) {
        Call <List<VideoSession>> call = apiService.getMostViewedAndRandomVideos();
        call.enqueue(new Callback<List<VideoSession>>() {
            @Override
            public void onResponse(Call<List<VideoSession>> call, Response<List<VideoSession>> response) {
                new Thread(() -> {
                    videoDao.clear();
                    videoDao.insertList(response.body());
                    videos.postValue(response.body());
                    videos.postValue(videoDao.index());
                }).start();
            }

            @Override
            public void onFailure(Call<List<VideoSession>> call, Throwable t) {

            }
        });
    }

    // Original getMostViewedAndRandomVideos
    public void getMostViewedAndRandomVideos(Callback<List<VideoSession>> callback) {
        Call<List<VideoSession>> call = apiService.getMostViewedAndRandomVideos();
        call.enqueue(new Callback<List<VideoSession>>() {
            @Override
            public void onResponse(Call<List<VideoSession>> call, Response<List<VideoSession>> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Fetching videos failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Fetching videos failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<List<VideoSession>> call, Throwable t) {
                Log.e(TAG, "Fetching videos failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }

    public void incrementViews(String id, String userId, Callback<VideoSession> callback) {
        // Create a map for the request body to send the userId
        Map<String, String> body = new HashMap<>();
        body.put("userId", userId);

        // Make the API call and pass the body with userId
        Call<VideoSession> call = apiService.incrementViews(id, body);
        call.enqueue(new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Incrementing views failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Incrementing views failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<VideoSession> call, Throwable t) {
                Log.e(TAG, "Incrementing views failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }


    public void updateVideoDetails(VideoSession video) {
        apiService.updateVideo(video.getId(), video).enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    new Thread(() -> {
                        videoDao.update(video);
                    }).start();
                    Log.d("UserRepository", "Video details updated successfully");
                } else {
                    Log.d("UserRepository", "Failed to update video details");
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.e("UserRepository", "Error updating video details", t);
            }
        });
    }

    public void deleteVideoById(String videoId) {
        Call<Void> call = apiService.deleteVideoById(videoId);
        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    new Thread(() -> {
                        videoDao.delete(videoId);
                    }).start();

                    Log.d("VideoAPI", "Video was deleted successfully");
                }
                else {
                    Log.d("VideoAPI", "Failed to delete video");
                }
            }
            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Log.e("VideoAPI", "Error updating video details", t);
            }
        });
    }

    public void getUserVideos(String userId, Callback<List<VideoSession>> callback) {
        Call<List<VideoSession>> call = apiService.getUserVideos(userId);
        call.enqueue(new Callback<List<VideoSession>>() {
            @Override
            public void onResponse(Call<List<VideoSession>> call, Response<List<VideoSession>> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Failed to fetch user videos with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Failed to fetch user videos with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<List<VideoSession>> call, Throwable t) {
                Log.e(TAG, "Failed to fetch user videos: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }

    public void getRecommendations(String videoId, String userId, Callback<RecommendationsResponse> callback) {
        // Create a map for the request body
        Map<String, String> body = new HashMap<>();
        body.put("userId", userId);

        // Make the API call and pass the callback to handle the response
        Call<RecommendationsResponse> call = apiService.getRecommendations(videoId, body);
        call.enqueue(new Callback<RecommendationsResponse>() {
            @Override
            public void onResponse(Call<RecommendationsResponse> call, Response<RecommendationsResponse> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Fetching recommendations failed with response code: " + response.code());
                    callback.onFailure(call, new Throwable("Fetching recommendations failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<RecommendationsResponse> call, Throwable t) {
                Log.e(TAG, "Fetching recommendations failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }


}