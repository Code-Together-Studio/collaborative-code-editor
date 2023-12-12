FROM openjdk:19-jdk as build
ENV JAVA_HOME=/usr/lib/jvm/java-19-openjdk-amd64
WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .

COPY src src

RUN chmod +x ./gradlew
RUN ./gradlew build

FROM openjdk:11-ea-19-jre
WORKDIR /app
COPY --from=build /app/build/libs/*.jar /app/app.jar
CMD ["java", "-jar", "/app/app.jar"]
