package com.spring.restaurant.util;

import java.util.UUID;

public class UserCode {
    public static String extractCode(){
        return UUID.randomUUID().toString();
    }
}
