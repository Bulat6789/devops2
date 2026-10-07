FROM golang:1.25-alpine AS builder

WORKDIR /src

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /out/notes .

FROM alpine:3.20 AS runtime

RUN adduser -D -H app

WORKDIR /app

COPY --from=builder /out/notes ./notes

RUN chown app:app /app

USER app

EXPOSE 8000

HEALTHCHECK --interval=10s --timeout=3s --retries=5 \
  CMD wget -qO- http://127.0.0.1:8000/health || exit 1

CMD ["/app/notes"]
