package com.example.youtube.view_model;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube.model.VideoSession;
import com.example.youtube.repository.VideoRepository;

import java.util.ArrayList;
import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class VideoViewModel extends AndroidViewModel {
    private static final String TAG = VideoViewModel.class.getSimpleName();
    private VideoRepository videoRepository;

    public VideoViewModel(@NonNull Application application) {
        super(application);
        videoRepository = new VideoRepository(application.getApplicationContext());
    }

    public LiveData<List<VideoSession>> getMostViewedAndRandomVideos() {
        MutableLiveData<List<VideoSession>> liveData = new MutableLiveData<>();
        videoRepository.getMostViewedAndRandomVideos(new Callback<List<VideoSession>>() {
            @Override
            public void onResponse(Call<List<VideoSession>> call, Response<List<VideoSession>> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                } else {
                    liveData.setValue(null);
                }
            }

            @Override
            public void onFailure(Call<List<VideoSession>> call, Throwable t) {
                liveData.setValue(null);
            }
        });
        return liveData;
    }

    public LiveData<VideoSession> incrementViews(String id) {
        MutableLiveData<VideoSession> liveData = new MutableLiveData<>();
        videoRepository.incrementViews(id, new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                } else {
                    liveData.setValue(null);
                }
            }

            @Override
            public void onFailure(Call<VideoSession> call, Throwable t) {
                liveData.setValue(null);
            }
        });
        return liveData;
    }

    public void updateVideoDetails(VideoSession video) {
        videoRepository.updateVideoDetails(video);
    }

    public void deleteVideoById(String videoId) {
        videoRepository.deleteVideoById(videoId);
    }

    public LiveData<List<VideoSession>> getUserVideos(String userId) {
        MutableLiveData<List<VideoSession>> liveData = new MutableLiveData<>();
        videoRepository.getUserVideos(userId, new retrofit2.Callback<List<VideoSession>>() {
            @Override
            public void onResponse(retrofit2.Call<List<VideoSession>> call, retrofit2.Response<List<VideoSession>> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                } else {
                    liveData.setValue(null);
                }
            }

            @Override
            public void onFailure(retrofit2.Call<List<VideoSession>> call, Throwable t) {
                liveData.setValue(null);
            }
        });
        return liveData;
    }

    public LiveData<VideoSession> createVideo(RequestBody userId, MultipartBody.Part videoFile, MultipartBody.Part thumbnailFile, RequestBody title, RequestBody description, RequestBody topic) {
        MutableLiveData<VideoSession> liveData = new MutableLiveData<>();
        videoRepository.createVideo(userId, videoFile, thumbnailFile, title, description, topic, new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                } else {
                    liveData.setValue(null);
                }
            }

            @Override
            public void onFailure(Call<VideoSession> call, Throwable t) {
                liveData.setValue(null);
            }
        });
        return liveData;
    }
}


