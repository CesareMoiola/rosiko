package com.cm.rosiko_be.player;

import com.cm.rosiko_be.matches_manager.MatchesManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/player")
@CrossOrigin(origins = "*")
public class PlayerController {
    /*
    @Autowired
    private PlayerService playerService;

    @Autowired
    private MatchesManager matchesManager;

    @GetMapping("/new_player")
    public ResponseEntity<PlayerDTO> getNewPlayer(){
        Player player = playerService.getNewPlayer();
        return ResponseEntity.ok(PlayerMapper.toPlayerDTO(player));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlayerDTO> getPlayer(@PathVariable("id") String id){
        Player player = playerService.getPlayer(id);
        return ResponseEntity.ok(PlayerMapper.toPlayerDTO(player));
    }

    @PutMapping("/update_socket/{id}")
    public void updateSocket(@PathVariable("id") String id, @RequestBody Map<String, String> payload){
        Player playerUpdated = playerService.updateSocket(id, payload.get("socketId"));
        matchesManager.updatePlayer(playerUpdated);
    }

    @PutMapping("/update")
    public void updatePlayer(@RequestBody PlayerDTO playerDTO){
        playerService.updatePlayer(playerDTO);
    }
     */
}
