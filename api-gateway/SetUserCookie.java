package com.example.apigateway;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticatedPrincipal;

import java.security.Principal;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Base64;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.CLIENT_RESPONSE_ATTR;

@Component
@Slf4j
public class SetUserCookie extends AbstractGatewayFilterFactory {

    private static final Gson gson = new Gson();
    private static final String COOKIE_NAME = "USER-DATA";
    private static final List<String> stringAttributes = Arrays.asList("preferred_username", "email", "name", "family_name", "given_name");
    
    public GatewayFilter apply() {
        return apply((Object) null);
    }

    @Override
    public GatewayFilter apply(Object config) {
        return new GatewayFilter() {
            @Override
            public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

                log.debug("Client Response: " + exchange.getAttribute(CLIENT_RESPONSE_ATTR));

                return exchange.getPrincipal()
                        .flatMap(SetUserCookie::getResponseCookie)
                        .doOnNext(cookie -> exchange.getResponse().addCookie(cookie))
                        .map(cookie -> exchange)
                        .defaultIfEmpty(exchange).flatMap(chain::filter);
            }
        };
    }

    private static Mono<ResponseCookie> getResponseCookie(final Principal userInfoPrincipal) {

        log.debug("User: " + userInfoPrincipal.getName() );

        if( userInfoPrincipal instanceof OAuth2AuthenticationToken ) {
            OAuth2AuthenticationToken principal = (OAuth2AuthenticationToken) userInfoPrincipal;

            gson.htmlSafe();
            String json = gson.toJson( principal.getPrincipal().getAttributes() );
            log.debug("json: " + json );

            return userDataExtractor(userInfoPrincipal)
                .map(gson::toJson)
                .map(String::getBytes)
                .map(bytes -> Base64.getEncoder().withoutPadding().encodeToString(bytes))
                .map(value -> ResponseCookie.from(COOKIE_NAME, value).path("/app").httpOnly(false).secure(true).build());

        }

        return Mono.just(userInfoPrincipal)
                .map(p -> p.getName())
                .map(String::getBytes)
                .map(bytes -> Base64.getEncoder().withoutPadding().encodeToString(bytes))
                .map(value -> ResponseCookie.from(COOKIE_NAME, value).path("/app").httpOnly(false).secure(true).build());
    }

    /**
     * Extract user data from a user info principal.
     * @param userInfoPrincipal Principal returned from user info.
     * @return Map containing all desired attributes.
     */
    public static Mono<Map<String, Object>> userDataExtractor(final Principal userInfoPrincipal) {
        return Mono.just(userInfoPrincipal)
                .filter(principal -> principal instanceof OAuth2AuthenticationToken)
                .cast(OAuth2AuthenticationToken.class)
                .map(OAuth2AuthenticationToken::getPrincipal)
                .map(OAuth2AuthenticatedPrincipal::getAttributes)
                .flatMap(SetUserCookie::filterMap);
    }

    /**
     * Filters a map returning only the specified keys.
     * @param map Map to be filtered.
     * @return Map containing the selected key value pairs.
     */
    private static Mono<? extends Map<String, Object>> filterMap(final Map<String, Object> map) {
        return Mono.just(new HashMap<String, Object>())
                .doOnNext(m -> stringAttributes.forEach(k -> m.put(k, map.getOrDefault(k, ""))));
    }
}
