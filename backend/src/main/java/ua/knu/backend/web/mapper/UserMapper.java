package ua.knu.backend.web.mapper;

import ua.knu.backend.entity.User;
import ua.knu.backend.web.dto.UserDto;

public class UserMapper {

    public static UserDto toDto(User user){
        return new UserDto(
                user.getId(),
                user.getUsername()
        );
    }
}
