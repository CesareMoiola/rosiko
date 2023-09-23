package com.cm.rosiko_be.User;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
public class UserService {

    List<User> users = new ArrayList<>();

    public User getNewUser(){
        String userId = getNewId();
        return getNewUser(userId);
    }

    public User getNewUser(String id){
        User user = new User(id);
        users.add(user);
        log.info("New user: " + user.getId());
        return user;
    }

    public User getUser(String userId){
        User user = null;

        for (User currentUser : users){
            if(currentUser.getId() != null && currentUser.getId().equals(userId)){
                user = currentUser;
                break;
            }
        }

        if(user == null){
            user = getNewUser(userId);
        }

        return user;
    }

    public void updateUser(User user) throws Exception {
        User oldUser = getUser(user.getId());
        if(oldUser == null){
            oldUser = getNewUser(user.getId());
        }

        oldUser.setSocketId(user.getSocketId());
    }

    public User updateSocket(String id, String socketId){
        log.info("User " + id + " update socket: " + socketId);
        User user = getUser(id);
        user.setSocketId(socketId);
        return user;
    }

    private String getNewId(){
        String userId;

        do {
            userId = UUID.randomUUID().toString();

            for (User currentUser : users) {
                if (currentUser.getId() != null && currentUser.getId().equals(userId)) {
                    userId = null;
                    break;
                }
            }
        }
        while (userId == null);

        return userId;
    }
}
