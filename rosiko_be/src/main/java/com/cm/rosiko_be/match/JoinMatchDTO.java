package com.cm.rosiko_be.match;

import lombok.Data;
import java.io.Serializable;

@Data
public class JoinMatchDTO implements Serializable {
    long matchId;
    String userId;
    String playerName;
}
