package com.cm.rosiko_be.match;

import com.cm.rosiko_be.player.PlayerDTO;
import lombok.Data;
import java.io.Serializable;

@Data
public class JoinMatchDTO implements Serializable {
    long matchId;
    PlayerDTO player;
}
