package com.example.youtube.api;

import com.example.youtube.model.ImagePathResponse;
import com.example.youtube.model.LoginRequest;
import com.example.youtube.model.LoginResponse;
import com.example.youtube.model.User;
import com.example.youtube.model.UserIdResponse;
import com.example.youtube.model.UserUpdateRequest;
import com.example.youtube.model.VideoSession;

import java.util.List;
import java.util.Map;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Part;
import retrofit2.http.Path;
import retrofit2.http.Query;
import com.example.youtube.model.CreateVideoRequest;
import com.example.youtube.model.ImagePathResponse;
import com.example.youtube.model.LoginRequest;
import com.example.youtube.model.LoginResponse;
import com.example.youtube.model.User;
import com.example.youtube.model.UserDisplayNameResponse;
import com.example.youtube.model.UserIdResponse;
import com.example.youtube.model.UserUpdateRequest;
import com.example.youtube.model.VideoSession;

public interface UserApiService {
    @GET("api/users")
    Call<List<User>> getUsers();

    @POST("api/users")
    Call<User> createUser(@Body User user);

    @GET("api/users/getUserId")
    Call<UserIdResponse> getUserIdByUsername(@Query("username") String username);

    @GET("api/users/{id}")
    Call<User> getUserById(@Path("id") String id);

    @PUT("api/users/{id}")
    Call<User> updateUser(@Path("id") String id, @Body UserUpdateRequest updateRequest);

    @DELETE("api/users/{id}")
    Call<Void> deleteUser(@Path("id") String id);

    @GET("/api/users/{id}/getDisplayName")
    Call<UserDisplayNameResponse> getUserDisplayName(@Path("id") String userId);


    @GET("api/users/{id}/getImagePath")
    Call<ImagePathResponse> getUserImagePath(@Path("id") String id);

    @Multipart
    @POST("api/users/register")
    Call<User> registerUser(
            @Part("username") RequestBody username,
            @Part("displayName") RequestBody displayName,
            @Part("password") RequestBody password,
            @Part MultipartBody.Part image
    );

    @POST("api/tokens")
    Call<LoginResponse> loginUser(@Body LoginRequest loginRequest);

    @GET("auth/verify-user")
    Call<User> verifyUser(@Header("Authorization") String token);

    @GET("api/users/{id}/videos")
    Call<List<VideoSession>> getVideosByUploader(@Path("id") String id);




    @GET("api/users/{id}/videos/{pid}")
    Call<VideoSession> getVideoById(@Path("id") String userId, @Path("pid") String videoId);

    @PUT("api/users/{id}")
    Call<User> updateDisplayName(@Header("Authorization") String token, @Path("id") String userId, @Body Map<String, String> displayName);


}
