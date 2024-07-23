package com.example.youtube.repository;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube.api.UserAPI;
import com.example.youtube.model.LoginRequest;
import com.example.youtube.model.LoginResponse;
import com.example.youtube.model.RegisterUserRequest;
import com.example.youtube.model.User;
import com.example.youtube.model.UserDisplayNameResponse;
import com.example.youtube.model.VideoSession;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserRepository {
    private UserAPI userAPI;

    public UserRepository() {
        userAPI = new UserAPI();
    }

    public void registerUser(RegisterUserRequest registerRequest, Callback<User> callback) {
        userAPI.registerUser(registerRequest, callback);
    }

    public void loginUser(LoginRequest loginRequest, Callback<LoginResponse> callback) {
        userAPI.loginUser(loginRequest, callback);
    }

    public void verifyUser(String token, Callback<User> callback) {
        userAPI.verifyUser(token, callback);
    }



    public void getUserDisplayName(String userId, Callback<UserDisplayNameResponse> callback) {
        userAPI.getUserDisplayName(userId, callback);
    }
  
    public void getVideoById(String userId, String videoId, Callback<VideoSession> callback) {
        userAPI.getVideoById(userId, videoId, callback);
    }

    public LiveData<Boolean> updateDisplayName(String token, String userId, String displayName) {
        MutableLiveData<Boolean> result = new MutableLiveData<>();
        userAPI.updateDisplayName(token, userId, displayName, new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    result.setValue(true);
                } else {
                    result.setValue(false);
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                result.setValue(false);
            }
        });
        return result;
    }


}
