FROM maven:3.8.8-openjdk-17 AS build
WORKDIR /app
COPY pom.xml mvnw ./
COPY .mvn .mvn
COPY src ./src
RUN mvn -DskipTests package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8000
ENTRYPOINT ["java","-jar","/app/app.jar"]
