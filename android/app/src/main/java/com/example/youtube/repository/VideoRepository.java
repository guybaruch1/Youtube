package com.example.youtube.repository;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.room.Room;

import com.example.youtube.activities.BaseActivity;
import com.example.youtube.activities.MainPageActivity;
import com.example.youtube.api.VideoAPI;
import com.example.youtube.model.VideoSession;
import com.example.youtube.room.AppDB;
import com.example.youtube.room.VideoDao;

import java.util.LinkedList;
import java.util.List;

import retrofit2.Callback;

public class VideoRepository {
   private VideoDao videoDao;
    private VideoAPI videoAPI;
    private VideoListData videoListData;

    public VideoRepository(@NonNull Application application) {
        AppDB db = Room.databaseBuilder(application.getApplicationContext(), AppDB.class, "VideosDB")
                .fallbackToDestructiveMigration().build();
        videoDao = db.videoDao();
        videoListData = new VideoListData();
        videoAPI = new VideoAPI(videoListData, videoDao);
    }

    class VideoListData extends MutableLiveData<List<VideoSession>> {
        public VideoListData() {
            super();
            List<VideoSession> videoList = new LinkedList<VideoSession>();
            setValue(videoList);
        }

        @Override
        protected void onActive(){
            super.onActive();
            videoAPI.getMostViewedAndRandomVideos(this);

            new Thread(()->{
                videoListData.postValue(videoDao.index());
            }).start();
        }
    }

    public LiveData<List<VideoSession>> getAll() {
        return videoListData;
    }

    public void reload() {
        videoAPI.getMostViewedAndRandomVideos(this.videoListData);
    }

    public void getMostViewedAndRandomVideos(Callback<List<VideoSession>> callback) {
        videoAPI.getMostViewedAndRandomVideos(callback);
    }

    public void incrementViews(String id, String userId, Callback<VideoSession> callback) {
        videoAPI.incrementViews(id, userId, callback);
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

}
