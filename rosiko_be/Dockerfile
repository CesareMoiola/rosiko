#
# Build stage
#

FROM eclipse-temurin:17-jdk-alpine

VOLUME ["/src/main/resources"]

ARG JAR_FILE=target/rosiko_be*.jar

COPY ${JAR_FILE} app.jar
COPY src/main/resources /src/main/resources


EXPOSE 8081
ENTRYPOINT ["java","-jar","/app.jar"]