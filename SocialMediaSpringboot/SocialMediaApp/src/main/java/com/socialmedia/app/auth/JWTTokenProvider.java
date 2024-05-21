package com.socialmedia.app.auth;

import com.socialmedia.app.constants.Constants;
import com.socialmedia.app.exceptions.CustomException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;
import java.util.Date;

public class JWTTokenProvider {
    public static SecretKey key= Keys.hmacShaKeyFor(Constants.SECRET_KEY.getBytes());
    public static String generateToken(Authentication authentication){
        String token= Jwts.builder().issuedAt(new Date(new Date().getTime()+84600000))
                .claim("email",authentication.getName()).signWith(key).compact();
        return token;
    }
    public static String getEmailFromJwtToken(String token){
        token=token.substring(7);
        try {
            Claims claims = Jwts.parser().setSigningKey(key).build().parseSignedClaims(token).getBody();
            String email = String.valueOf(claims.get("email"));
            return email;
        } catch (CustomException e) {
            throw new CustomException("Invalid Token");
        }
    }
}
