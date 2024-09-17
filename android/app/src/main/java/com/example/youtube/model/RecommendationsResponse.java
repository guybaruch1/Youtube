package com.example.youtube.model;
import java.util.List;

public class RecommendationsResponse {
    private String message;
    private List<VideoSession> recommendedVideos; // Now it's VideoSession

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<VideoSession> getRecommendedVideos() {
        return recommendedVideos;
    }

    public void setRecommendedVideos(List<VideoSession> recommendedVideos) {
        this.recommendedVideos = recommendedVideos;
    }
}