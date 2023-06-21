package com.cm.rosiko_be.match;

import lombok.Data;
import java.io.Serializable;

@Data
public class NewMatchDTO implements Serializable {
    private long id;
    private String name;
    private String password;
}
