import matplotlib.pyplot as plt
import numpy as np

# Simulation parameters
dt = 0.1  # Time step
duration = 10  # Total simulation time
steps = int(duration / dt)

# Initial conditions for a single object
position = np.array([0.0, 0.0])  # Initial position (x, y)
velocity = np.array([1.0, 0.0])  # Initial velocity (vx, vy)

# Store results for plotting
positions = [position.copy()]
velocities = [velocity.copy()]
times = [0]

# --- Simulation Loop ---
for t in range(steps):
    # 1. Calculate acceleration (a = F/m). Here, net force is 0, so acceleration is 0 for pure inertia.
    # In a more complex simulation, you would calculate the net force here.
    acceleration = np.array([0.0, 0.0])

    # 2. Update velocity based on acceleration and time step (v_new = v_old + a * dt)
    velocity += acceleration * dt

    # 3. Update position based on velocity and time step (p_new = p_old + v * dt)
    # A more accurate approach (Euler-Cromer) would be: p_new = p_old + v_new * dt
    position += velocity * dt

    # Store the updated state
    positions.append(position.copy())
    velocities.append(velocity.copy())
    times.append((t + 1) * dt)

# Convert lists to NumPy arrays for easier handling
positions = np.array(positions)
velocities = np.array(velocities)

# --- Visualization ---
plt.figure(figsize=(12, 6))

# Plot position over time
plt.subplot(1, 2, 1)
plt.plot(times, positions[:, 0], label='X Position')
plt.plot(times, positions[:, 1], label='Y Position')
plt.xlabel('Time (s)')
plt.ylabel('Position')
plt.title('Position of Object Over Time (Inertia)')
plt.legend()
plt.grid(True)

# Plot velocity over time
plt.subplot(1, 2, 2)
plt.plot(times, velocities[:, 0], label='X Velocity')
plt.plot(times, velocities[:, 1], label='Y Velocity')
plt.xlabel('Time (s)')
plt.ylabel('Velocity')
plt.title('Velocity of Object Over Time (Inertia)')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()