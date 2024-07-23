package com.example.youtube.view_model;

import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.example.youtube.model.RegisterUserRequest;
import com.example.youtube.model.User;
import com.example.youtube.model.UserDisplayNameResponse;
import com.example.youtube.model.VideoSession;
import com.example.youtube.repository.UserRepository;
import com.example.youtube.model.LoginRequest;
import com.example.youtube.model.LoginResponse;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserViewModel extends AndroidViewModel {
    private static final String TAG = UserViewModel.class.getSimpleName();
    private UserRepository mRepository;

    public UserViewModel(@NonNull Application application) {
        super(application);
        mRepository = new UserRepository();
    }

    public LiveData<User> registerUser(RegisterUserRequest registerRequest) {
        MutableLiveData<User> liveData = new MutableLiveData<>();
        mRepository.registerUser(registerRequest, new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                    Log.d(TAG, "Registration successful: " + response.body().toString());
                } else {
                    liveData.setValue(null);
                    Log.e(TAG, "Registration failed with response code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                liveData.setValue(null);
                Log.e(TAG, "Registration failed: " + t.getMessage());
            }
        });
        return liveData;
    }

    public LiveData<LoginResponse> loginUser(LoginRequest loginRequest) {
        MutableLiveData<LoginResponse> liveData = new MutableLiveData<>();
        mRepository.loginUser(loginRequest, new Callback<LoginResponse>() {
            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                    Log.d(TAG, "Login successful: " + response.body().toString());
                } else {
                    liveData.setValue(null);
                    Log.e(TAG, "Login failed with response code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                liveData.setValue(null);
                Log.e(TAG, "Login failed: " + t.getMessage());
            }
        });
        return liveData;
    }

    public LiveData<User> verifyUser(String token) {
        MutableLiveData<User> liveData = new MutableLiveData<>();
        mRepository.verifyUser(token, new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    liveData.setValue(response.body());
                    Log.d(TAG, "Fetched user details successfully: " + response.body().toString());
                } else {
                    liveData.setValue(null);
                    Log.e(TAG, "Failed to fetch user details with response code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                liveData.setValue(null);
                Log.e(TAG, "Failed to fetch user details: " + t.getMessage());
            }
        });
        return liveData;
    }




    public LiveData<String> getUserDisplayName(String id) {
        MutableLiveData<String> liveData = new MutableLiveData<>();
        mRepository.getUserDisplayName(id, new Callback<UserDisplayNameResponse>() {
            @Override
            public void onResponse(Call<UserDisplayNameResponse> call, Response<UserDisplayNameResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    liveData.setValue(response.body().getDisplayName());
                } else {
                    liveData.setValue(null);
                }
            }

            @Override
            public void onFailure(Call<UserDisplayNameResponse> call, Throwable t) {
                liveData.setValue(null);
            }
        });
        return liveData;
    }

    public LiveData<VideoSession> getVideoById(String userId, String videoId) {
        MutableLiveData<VideoSession> liveData = new MutableLiveData<>();
        mRepository.getVideoById(userId, videoId, new Callback<VideoSession>() {
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

    public LiveData<Boolean> updateDisplayName(String token, String userId, String displayName) {
        return mRepository.updateDisplayName(token, userId, displayName);
    }


}
