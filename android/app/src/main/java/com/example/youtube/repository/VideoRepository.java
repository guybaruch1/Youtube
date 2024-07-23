package com.example.youtube.repository;

import android.content.Context;

import com.example.youtube.api.VideoAPI;
import com.example.youtube.model.VideoSession;

import java.util.List;

import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import retrofit2.Callback;

public class VideoRepository {
    private VideoAPI videoAPI;

    public VideoRepository(Context context) {
        videoAPI = new VideoAPI(context);
    }

    public void getMostViewedAndRandomVideos(Callback<List<VideoSession>> callback) {
        videoAPI.getMostViewedAndRandomVideos(callback);
    }

    public void incrementViews(String id, Callback<VideoSession> callback) {
        videoAPI.incrementViews(id, callback);
    }

    public void updateVideoDetails(VideoSession video) {
        videoAPI.updateVideoDetails(video);
    }

    public void deleteVideoById(String videoId) {
        videoAPI.deleteVideoById(videoId);
    }

    public void getUserVideos(String userId, Callback<List<VideoSession>> callback) {
        videoAPI.getUserVideos(userId, callback);
    }

    public void createVideo(RequestBody userId, MultipartBody.Part videoFile, MultipartBody.Part thumbnailFile, RequestBody title, RequestBody description, RequestBody topic, Callback<VideoSession> callback) {
        videoAPI.createVideo(userId, videoFile, thumbnailFile, title, description, topic, callback);
    }
}
