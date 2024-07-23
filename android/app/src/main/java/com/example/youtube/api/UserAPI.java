package com.example.youtube.api;

import android.util.Log;

import com.example.youtube.model.LoginRequest;
import com.example.youtube.model.LoginResponse;
import com.example.youtube.model.RegisterUserRequest;
import com.example.youtube.model.User;
import com.example.youtube.model.VideoSession;
import com.example.youtube.utils.RetrofitInstance;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import com.example.youtube.model.LoginRequest;
import com.example.youtube.model.LoginResponse;
import com.example.youtube.model.RegisterUserRequest;
import com.example.youtube.model.UserDisplayNameResponse;
import com.example.youtube.model.VideoSession;
import com.example.youtube.utils.RetrofitInstance;
import com.example.youtube.model.User;

public class UserAPI {
    private static final String TAG = UserAPI.class.getSimpleName();
    private UserApiService apiService;

    public UserAPI() {
        apiService = RetrofitInstance.getRetrofitInstance().create(UserApiService.class);
    }

    public void registerUser(RegisterUserRequest registerRequest, Callback<User> callback) {
        RequestBody username = RequestBody.create(MediaType.parse("text/plain"), registerRequest.getUsername());
        RequestBody displayName = RequestBody.create(MediaType.parse("text/plain"), registerRequest.getDisplayName());
        RequestBody password = RequestBody.create(MediaType.parse("text/plain"), registerRequest.getPassword());

        MultipartBody.Part imagePart = null;
        if (registerRequest.getImage() != null && !registerRequest.getImage().isEmpty()) {
            File imageFile = new File(registerRequest.getImage());
            RequestBody imageBody = RequestBody.create(MediaType.parse("image/*"), imageFile);
            imagePart = MultipartBody.Part.createFormData("photo", imageFile.getName(), imageBody);
        }

        Call<User> call = apiService.registerUser(username, displayName, password, imagePart);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Registration failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Registration failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e(TAG, "Registration failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }

    public void loginUser(LoginRequest loginRequest, Callback<LoginResponse> callback) {
        Call<LoginResponse> call = apiService.loginUser(loginRequest);
        call.enqueue(new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Login failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Login failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                Log.e(TAG, "Login failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }

    public void verifyUser(String token, Callback<User> callback) {
        Call<User> call = apiService.verifyUser("Bearer " + token);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Fetching user details failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Fetching user details failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e(TAG, "Fetching user details failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }


    public void getUserDisplayName(String userId, Callback<UserDisplayNameResponse> callback) {
        Call<UserDisplayNameResponse> call = apiService.getUserDisplayName(userId);
        call.enqueue(new Callback<UserDisplayNameResponse>() {
            @Override
            public void onResponse(Call<UserDisplayNameResponse> call, Response<UserDisplayNameResponse> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Fetching displayName failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Fetching displayName failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<UserDisplayNameResponse> call, Throwable t) {
                Log.e(TAG, "Fetching displayName failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }
  
    public void getVideoById(String userId, String videoId, Callback<VideoSession> callback) {
        Call<VideoSession> call = apiService.getVideoById(userId, videoId);
        call.enqueue(new Callback<VideoSession>() {
            @Override
            public void onResponse(Call<VideoSession> call, Response<VideoSession> response) {
                if (response.isSuccessful()) {
                    Log.d(TAG, "Fetched video successfully");
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Fetching video failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Fetching video failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<VideoSession> call, Throwable t) {
                Log.e(TAG, "Fetching video failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }

    public void updateDisplayName(String token, String userId, String displayName, Callback<User> callback) {
        Map<String, String> displayNameMap = new HashMap<>();
        displayNameMap.put("display_name", displayName);

        Call<User> call = apiService.updateDisplayName("Bearer " + token, userId, displayNameMap);
        call.enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    callback.onResponse(call, response);
                } else {
                    Log.e(TAG, "Updating display name failed with response code: " + response.code());
                    try {
                        Log.e(TAG, "Response error body: " + response.errorBody().string());
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    callback.onFailure(call, new Throwable("Updating display name failed with response code: " + response.code()));
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                Log.e(TAG, "Updating display name failed: " + t.getMessage());
                callback.onFailure(call, t);
            }
        });
    }


}