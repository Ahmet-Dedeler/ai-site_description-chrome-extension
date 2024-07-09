# Stage 1: Build stage
FROM python:3.8-slim as builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

WORKDIR /app

COPY requirements.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /app/wheels -r requirements.txt

# Stage 2: Production stage
FROM python:3.8-slim as production

# Argument to specify the environment
ARG ENVIRONMENT=production

# Create a non-root user
RUN useradd --create-home appuser

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/home/appuser/.local/bin:${PATH}"

WORKDIR /home/appuser

# Copy and install dependencies
COPY --from=builder /app/wheels /wheels
COPY --from=builder /app/requirements.txt .
RUN pip install --user --no-cache-dir /wheels/*

# Copy the application code
COPY --chown=appuser:appuser . .

# Switch to non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 8000

# Use an entrypoint script to determine which command to run
COPY --chown=appuser:appuser docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

# Default command (can be overridden)
CMD ["gunicorn", "main:app", "--bind", "0.0.0.0:8000", "--workers", "3"]