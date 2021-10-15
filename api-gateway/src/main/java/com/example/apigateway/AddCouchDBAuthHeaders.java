package com.example.apigateway;

import lombok.extern.slf4j.Slf4j;
import org.bouncycastle.util.encoders.Hex;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Arrays;
import java.util.List;

@Component
@Slf4j
public class AddCouchDBAuthHeaders extends AbstractGatewayFilterFactory<AddCouchDBAuthHeaders.Config> {

    public AddCouchDBAuthHeaders() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(AddCouchDBAuthHeaders.Config config) {

        return new GatewayFilter() {
            @Override
            public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
                return exchange.getPrincipal()
                        .map(p -> exchange.getRequest().mutate()
                                .header("X-Auth-CouchDB-UserName", p.getName())
                                .header("X-Auth-CouchDB-Roles", "_admin,blogger")
                                .header("X-Auth-CouchDB-Token", encodeHmacSHA1(p.getName(), config.getSigningKey()))
                                .build())
                        .map(request -> exchange.mutate().request(request).build())
                        .defaultIfEmpty(exchange).flatMap(chain::filter);
            }
        };
    }

    @Override
    public List<String> shortcutFieldOrder() {
        return Arrays.asList("signingKey");
    }

    public static class Config {

        private String signingKey;

        public Config() {
        }

        public Config(String signingKey) {
            this.signingKey = signingKey;
        }

        public String getSigningKey() {
            return signingKey;
        }

        public void setSigningKey(String signingKey) {
            this.signingKey = signingKey;
        }
    }

    /**
     * Encode a string using a signing key using the HMACSHA1 algorithm.
     * 
     * @param username
     * @param signingKey
     * @return
     */
    private static String encodeHmacSHA1( String username, String signingKey ) {

        try {
            //String signingKey = "92de07df7e7a3fe14808cef90a7cc0d91";
            log.debug("Signing Key: " + signingKey);

            SecretKeySpec signingKeySpec = new SecretKeySpec(signingKey.getBytes("UTF-8"), "HmacSHA1");
            Mac sha256_HMAC = Mac.getInstance("HmacSHA1");
            sha256_HMAC.init(signingKeySpec);
            String signed = new String(Hex.encode(sha256_HMAC.doFinal(username.getBytes("UTF-8"))));
            log.debug("Signed: " + signed);
            return signed;
        }
        catch(Exception e) {
            System.err.println( e.getMessage() );
            return "";
        }
    }

}
