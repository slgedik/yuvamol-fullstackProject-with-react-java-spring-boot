package com.silagedik.yuvamol.business.concretes;

import com.silagedik.yuvamol.dataAccess.abstracts.UserDao;
import com.silagedik.yuvamol.entities.concretes.User;
import com.silagedik.yuvamol.security.CustomUserDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsManager implements UserDetailsService {

    private UserDao userDao;
    @Autowired
    public UserDetailsManager(UserDao userDao) {
        this.userDao = userDao;
    }
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new CustomUserDetails(user);
    }
}

