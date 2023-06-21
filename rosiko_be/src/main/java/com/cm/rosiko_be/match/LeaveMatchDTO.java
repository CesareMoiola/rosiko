package com.cm.rosiko_be.match;

import lombok.Data;
import java.io.Serializable;

@Data
public class LeaveMatchDTO implements Serializable {
    long matchId;
    String playerId;
}