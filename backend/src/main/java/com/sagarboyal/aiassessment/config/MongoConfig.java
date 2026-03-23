package com.sagarboyal.aiassessment.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Value("${MONGODB_URI}")
    private String mongoUri;

    @Value("${DATABASE_NAME:}")
    private String databaseName;

    @Override
    protected String getDatabaseName() {
        if (databaseName != null && !databaseName.isBlank()) {
            return databaseName;
        }

        String uriDatabase = new ConnectionString(mongoUri).getDatabase();
        if (uriDatabase != null && !uriDatabase.isBlank()) {
            return uriDatabase;
        }

        throw new IllegalStateException("Mongo database name is missing. Set DATABASE_NAME or include it in MONGODB_URI.");
    }

    @Override
    public MongoClient mongoClient() {
        ConnectionString connectionString = new ConnectionString(mongoUri);
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();
        return MongoClients.create(settings);
    }
}
