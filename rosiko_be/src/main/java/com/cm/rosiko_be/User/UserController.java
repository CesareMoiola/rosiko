package com.cm.rosiko_be.User;

import com.cm.rosiko_be.matches_manager.MatchesManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private MatchesManager matchesManager;

    @GetMapping("/new_user")
    public ResponseEntity<User> getNewUser(){
        User user = userService.getNewUser();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") String id){
        User user = userService.getUser(id);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/update_socket/{id}")
    public void updateSocket(@PathVariable("id") String id, @RequestBody Map<String, String> payload) throws Exception{
        User userUpdated = userService.updateSocket(id, payload.get("socketId"));
        userService.updateUser(userUpdated);
    }

    @PutMapping("/update")
    public void updateUser(@RequestBody User user) throws Exception{
        userService.updateUser(user);
    }
}
