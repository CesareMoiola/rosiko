package com.cm.rosiko_be.data;

import lombok.Data;
import java.io.Serializable;
import java.util.Map;

@Data
public class ArmiesToPlace implements Serializable {
    private Long matchId;
    private Map<String, Integer> armies;

    public ArmiesToPlace(){super();}
}
