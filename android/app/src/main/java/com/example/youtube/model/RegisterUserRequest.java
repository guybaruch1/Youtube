package com.example.youtube.model;
public class RegisterUserRequest {
    private String username;
    private String displayName;
    private String password;
    private String image;

    public RegisterUserRequest(String username, String displayName, String password, String image) {
        this.username = username;
        this.displayName = displayName;
        this.password = password;
        this.image = image;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
