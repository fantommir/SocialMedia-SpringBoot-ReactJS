package com.socialmedia.app.auth;
import com.socialmedia.app.constants.Constants;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class validateUserByJWT extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token=request.getHeader(Constants.JWT_HEADER);
        if(token!=null){
            try{
                String email=JWTTokenProvider.getEmailFromJwtToken(token);
                List<GrantedAuthority>authorities=new ArrayList<>();
                Authentication authentication=new UsernamePasswordAuthenticationToken(email,null,authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            catch (Exception e){
                throw new  BadCredentialsException("Invalid Token");
            }
        }
        filterChain.doFilter(request,response);
    }
}
