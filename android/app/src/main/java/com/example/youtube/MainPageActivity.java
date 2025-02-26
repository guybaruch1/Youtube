package com.example.youtube;

import android.annotation.SuppressLint;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class MainPageActivity extends AppCompatActivity {

    private static final String TAG = "MainPageActivity";
    private static List<Video> videoList = new ArrayList<>();

    private ImageButton searchButton;
    private ImageButton closeSearchButton;
    private LinearLayout upperBar;
    private LinearLayout searchBarContainer;
    private EditText searchBar;
    private Button signInButton;
    private Button signOutButton;
    private ImageButton homeButton;
    private ImageButton addButton;
    private ImageButton youButton;
    private RecyclerView recyclerView;
    private VideoAdapter videoAdapter;
    private List<Video> filteredVideoList;

    private TextView displayNameTextView;
    private ImageView profileImageView;

    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main_page);

        filteredVideoList = new ArrayList<>(videoList);
        videoAdapter = new VideoAdapter(this, filteredVideoList);

        // Load videos from JSON file
        loadVideosFromJSON();
        loadVideosFromStateManager();
        // Initialize views
        searchButton = findViewById(R.id.search_button);
        closeSearchButton = findViewById(R.id.close_search_button);
        upperBar = findViewById(R.id.upper_bar);
        searchBarContainer = findViewById(R.id.search_bar_container);
        searchBar = findViewById(R.id.search_bar);
        signInButton = findViewById(R.id.sign_in_button);
        signOutButton = findViewById(R.id.sign_out_button);
        homeButton = findViewById(R.id.home_button);
        addButton = findViewById(R.id.add_button);
        youButton = findViewById(R.id.you_button);
        recyclerView = findViewById(R.id.recycler_view);

        displayNameTextView = findViewById(R.id.display_name);
        profileImageView = findViewById(R.id.profile_image);

        // Check if user is logged in and display user information
        UserSession userSession = UserSession.getInstance();
        if (userSession.isLoggedIn()) {
            displayNameTextView.setText(userSession.getDisplayName());
            String profilePhotoUrl = userSession.getProfilePhoto();
            if (profilePhotoUrl != null && !profilePhotoUrl.isEmpty()) {
                setImageFromUrl(profileImageView, profilePhotoUrl);
            } else {
                profileImageView.setImageResource(R.drawable.default_profile);
            }
            displayNameTextView.setVisibility(View.VISIBLE);
            profileImageView.setVisibility(View.VISIBLE);
            signInButton.setVisibility(View.GONE);
            signOutButton.setVisibility(View.VISIBLE);
        } else {
            displayNameTextView.setVisibility(View.GONE);
            profileImageView.setVisibility(View.GONE);
            signInButton.setVisibility(View.VISIBLE);
            signOutButton.setVisibility(View.GONE);
        }

        // Set click listener for search button
        searchButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                upperBar.setVisibility(View.GONE);
                searchBarContainer.setVisibility(View.VISIBLE);
            }
        });

        // Set click listener for close search button
        closeSearchButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                searchBarContainer.setVisibility(View.GONE);
                upperBar.setVisibility(View.VISIBLE);
                searchBar.setText(""); // Clear the search bar when closing
                performSearch(""); // Reset the list to show all videos
            }
        });

        // Set click listener for sign in button
        signInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainPageActivity.this, LoginActivity.class);
                startActivity(intent);
            }
        });

        // Set click listener for sign out button
        signOutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                UserSession.getInstance().clearSession();
                recreate(); // Restart the activity to update the UI
            }
        });

        // Set up search bar action listener
        searchBar.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_SEARCH ||
                        (event != null && event.getKeyCode() == KeyEvent.KEYCODE_ENTER && event.getAction() == KeyEvent.ACTION_DOWN)) {
                    String query = searchBar.getText().toString().trim();
                    performSearch(query);
                    return true;
                }
                return false;
            }
        });


        // Set up RecyclerView
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setAdapter(videoAdapter);

        // Check if there is new video data from UploadVideoActivity
        Intent intent = getIntent();
        if (intent.hasExtra("IS_NEW_VIDEO") && intent.getBooleanExtra("IS_NEW_VIDEO", false)) {
            String id = intent.getStringExtra("VIDEO_ID");
            String title = intent.getStringExtra("VIDEO_TITLE");
            String videoUrl = intent.getStringExtra("VIDEO_URL");
            String imageUrl = intent.getStringExtra("IMAGE_URL");
            int likes = intent.getIntExtra("VIDEO_LIKES", 0);
            int views = intent.getIntExtra("VIDEO_VIEWS", 0);
            String uploadDate = intent.getStringExtra("VIDEO_UPLOAD_DATE");
            String description = intent.getStringExtra("VIDEO_DESCRIPTION");
            String topic = intent.getStringExtra("VIDEO_TOPIC");
            String channel = intent.getStringExtra("VIDEO_CHANNEL");

            // Create new video object
            Video newVideo = new Video(id, title, videoUrl, imageUrl, likes, views, uploadDate, description, topic, false, channel, new ArrayList<>());


            // Add new video to the VideoStateManager and video list
            VideoStateManager.getInstance().addVideo(newVideo);
            videoList.add(newVideo);
            videoAdapter.updateList(videoList);
        }
    }

    private void performSearch(String query) {
        filteredVideoList.clear();
        if (query.isEmpty()) {
            filteredVideoList.addAll(videoList);
        } else {
            for (Video video : videoList) {
                if (video.getTitle().toLowerCase().contains(query.toLowerCase())) {
                    filteredVideoList.add(video);
                }
            }
        }
        videoAdapter.updateList(filteredVideoList);
    }

    private void setImageFromUrl(ImageView imageView, String urlString) {
        if (urlString != null && !urlString.isEmpty()) {
            new Thread(() -> {
                try {
                    Log.d(TAG, "Loading image from URL: " + urlString);
                    InputStream inputStream = new URL(urlString).openStream();
                    Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
                    runOnUiThread(() -> {
                        if (bitmap != null) {
                            imageView.setImageBitmap(bitmap);
                        } else {
                            Log.e(TAG, "Bitmap is null");
                            imageView.setImageResource(R.drawable.default_profile);
                        }
                    });
                } catch (IOException e) {
                    Log.e(TAG, "Error loading image from URL", e);
                    runOnUiThread(() -> imageView.setImageResource(R.drawable.default_profile));
                }
            }).start();
        } else {
            Log.e(TAG, "Image URL is null or empty");
            imageView.setImageResource(R.drawable.default_profile);
        }
    }

    private void showSignInAlert() {
        new AlertDialog.Builder(this)
                .setTitle("Sign In Required")
                .setMessage("Only signed in users can upload videos.")
                .setPositiveButton("Sign In", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        Intent intent = new Intent(MainPageActivity.this, LoginActivity.class);
                        startActivity(intent);
                    }
                })
                .setNegativeButton("Cancel", null)
                .setIcon(android.R.drawable.ic_dialog_alert)
                .show();
    }

    // Load videos from JSON or VideoStateManager
    private void loadVideosFromJSON() {
        // Clear the existing video list to avoid duplicates
        videoList.clear();
        String jsonFileContent = Utils.loadJSONFromAsset(this, "videodata.json");
        if (jsonFileContent != null) {
            Gson gson = new Gson();
            Type videoListType = new TypeToken<List<VideoData>>() {}.getType();
            List<VideoData> videoDataList = gson.fromJson(jsonFileContent, videoListType);

            VideoStateManager videoStateManager = VideoStateManager.getInstance();

            for (VideoData videoData : videoDataList) {
                String videoId = String.valueOf(videoData.getId());
                String title = videoStateManager.getTitle(videoId);
                if (title.isEmpty()) {
                    title = videoData.getTitle();
                }

                String description = videoStateManager.getDescription(videoId);
                if (description.isEmpty()) {
                    description = videoData.getDescription();
                }

                Video video = new Video(
                        videoId,
                        title,
                        videoData.getVideoPath(),
                        videoData.getImageUrl(),
                        videoData.getLikes(),
                        videoData.getViewsCount(),
                        videoData.getDateUploaded(),
                        description,
                        videoData.getTopic(),
                        videoData.isLiked(),
                        videoData.getChannel(),
                        videoData.getComments()
                );
                videoStateManager.addVideo(video);
            }

            // Also add videos from VideoStateManager
            videoList.addAll(videoStateManager.getAllVideos());

            videoAdapter.updateList(videoList);
        } else {
            // Handle error
        }
    }
    private void loadVideosFromStateManager() {
        VideoStateManager videoStateManager = VideoStateManager.getInstance();
        List<Video> allVideos = videoStateManager.getAllVideos();
        videoList.clear();
        videoList.addAll(allVideos);
        videoAdapter.updateList(videoList);
    }
}

