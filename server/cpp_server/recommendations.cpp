#include "recommendations.h"
#include <unordered_map>
#include <unordered_set>
#include <algorithm>
#include <vector>  // Include vector header
#include <iostream>
#include <string>  // Include string header

// User watch history: maps userId to a list of watched videoIds
std::unordered_map<std::string, std::vector<std::string>> userWatchHistory;

// Video view count: maps videoId to its view count (popularity)
std::unordered_map<std::string, int> videoViewCount;

void storeUserWatchData(const std::string& userId, const std::string& videoId) {
    userWatchHistory[userId].push_back(videoId);
    videoViewCount[videoId]++;
}

std::string recommendVideos(const std::string& userId) {
    std::unordered_set<std::string> watchedVideos(userWatchHistory[userId].begin(), userWatchHistory[userId].end());
    std::unordered_map<std::string, int> recommendationScore;

    // Iterate through other users' watch histories to find recommendations
    for (const auto& [otherUserId, otherUserVideos] : userWatchHistory) {
        if (otherUserId == userId) continue;  // Skip the current user

        for (const auto& videoId : otherUserVideos) {
            if (watchedVideos.find(videoId) == watchedVideos.end()) {
                recommendationScore[videoId] += videoViewCount[videoId];  // Score based on view count
            }
        }
    }

    // Sort the recommendations based on the score (videoViewCount)
    std::vector<std::pair<std::string, int>> sortedRecommendations(recommendationScore.begin(), recommendationScore.end());
    std::sort(sortedRecommendations.begin(), sortedRecommendations.end(),
              [](const std::pair<std::string, int>& a, const std::pair<std::string, int>& b) { return a.second > b.second; });

    // Build the recommendation string
    std::string recommendations = "Recommended videos: ";
    int count = 0;
    for (const auto& [videoId, score] : sortedRecommendations) {
        recommendations += videoId + " ";
        if (++count >= 6) break;  // Return top 6 recommendations
    }

    return recommendations;
}
