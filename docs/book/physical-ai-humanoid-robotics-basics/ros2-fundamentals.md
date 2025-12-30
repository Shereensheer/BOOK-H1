---
sidebar_position: 4
---

import UrduTranslateButton from '@site/src/components/UrduTranslateButton';

<UrduTranslateButton />

# ROS 2 Fundamentals

## Learning Objectives
By the end of this chapter, students will be able to:
- Describe the core architecture of ROS 2 (Robot Operating System 2).
- Understand and utilize ROS 2 concepts: nodes, topics, services, and actions.
- Create a basic ROS 2 package in Python or C++.
- Implement simple publish/subscribe communication between ROS 2 nodes.
- Use `colcon` for building ROS 2 workspaces and `rviz` for visualization.

## Introduction to ROS 2
ROS 2 (Robot Operating System 2) is a flexible framework for writing robot software. It provides libraries and tools to help software developers create complex robot behaviors across a wide variety of robotic platforms. Unlike its predecessor ROS 1, ROS 2 is designed with improvements for multi-robot systems, real-time control, and a wider range of operating environments.

### Why ROS 2 for Physical AI?
ROS 2 provides a standardized, modular, and robust communication infrastructure essential for integrating diverse hardware components (sensors, actuators) and software modules (perception, planning, control) in Physical AI and humanoid robotics. Its distributed nature supports complex systems, and its rich ecosystem accelerates development.

## ROS 2 Core Concepts

### 1. Nodes
A node is an executable process that performs computation. In ROS 2, nodes are the fundamental building blocks of a robotic system. Each node should ideally be responsible for a single, well-defined task (e.g., a camera driver node, a navigation node, a motor control node).

```python
# Example: Minimal ROS 2 Python node
import rclpy
from rclpy.node import Node

class MinimalNode(Node):
    def __init__(self):
        super().__init__('minimal_node')
        self.get_logger().info('Minimal Node Started')

def main(args=None):
    rclpy.init(args=args)
    minimal_node = MinimalNode()
    rclpy.spin(minimal_node)
    minimal_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### 2. Topics
Topics are the most common way for nodes to asynchronously send and receive data (messages) in a many-to-many fashion. A node can *publish* messages to a topic, and other nodes can *subscribe* to that topic to receive those messages.

- **Publishers:** Nodes that send messages.
- **Subscribers:** Nodes that receive messages.
- **Messages:** Data structures with defined types (e.g., `std_msgs/msg/String`, `sensor_msgs/msg/LaserScan`).

```python
# Example: ROS 2 Python publisher and subscriber
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.publisher_ = self.create_publisher(String, 'chatter', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello ROS 2! {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

class Listener(Node):
    def __init__(self):
        super().__init__('listener')
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    talker_node = Talker()
    listener_node = Listener()
    executor = rclpy.executors.MultiThreadedExecutor()
    executor.add_node(talker_node)
    executor.add_node(listener_node)

    try:
        executor.spin()
    except KeyboardInterrupt:
        pass
    finally:
        talker_node.destroy_node()
        listener_node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### 3. Services
Services provide a request/response communication model, suitable for synchronous operations that block until a response is received. A node can *advertise* a service, and other nodes can *call* that service.

- **Servers:** Nodes that provide a service.
- **Clients:** Nodes that request a service.
- **Service Definition:** Specifies the request and response message types.

### 4. Actions
Actions are designed for long-running tasks with preemptable goals and continuous feedback. They consist of a goal (request), feedback (intermediate updates), and a result (final outcome). They are built on topics and services.

- **Action Servers:** Nodes that offer an action.
- **Action Clients:** Nodes that request an action.
- **Action Definition:** Specifies the goal, feedback, and result message types.

## ROS 2 Tools

### `colcon` Build System
`colcon` is the primary build tool for ROS 2. It compiles code, links libraries, and prepares packages for execution. A ROS 2 workspace is a collection of packages that you want to build and install together.

```bash
# Example: Building a ROS 2 workspace
cd ~/ros2_ws # Navigate to your workspace root
source /opt/ros/humble/setup.bash # Source your ROS 2 installation
# Create a new package (example, if not already created)
# ros2 pkg create --build-type ament_python my_robot_pkg
colcon build --packages-select my_robot_pkg
source install/setup.bash # Source the workspace after building
```

### `rviz` Visualization Tool
`rviz` (ROS Visualization) is a 3D visualization tool for robots, sensors, and algorithms. It allows you to visualize robot models (URDF), sensor data (point clouds, images), and planning outputs.

*Diagram: Screenshot of rviz displaying a robot model and sensor data*

To launch rviz and load a robot model:
```bash
# Example: Launching rviz with a robot model
ros2 launch urdf_tutorial display.launch.py model:=src/my_robot_pkg/urdf/my_robot.urdf
rviz2
```

## Creating a ROS 2 Package and Workspace (Conceptual Example)

1.  **Create a Workspace:**
    ```bash
    mkdir -p ~/ros2_ws/src
    cd ~/ros2_ws
    ```
2.  **Create a Package (Python):**
    ```bash
    cd src
    ros2 pkg create --build-type ament_python my_python_pkg
    ```
    This will create a `my_python_pkg` directory with `package.xml`, `setup.py`, and an empty `my_python_pkg` folder for your Python modules.
3.  **Add Code:** Place your Python nodes (like the `Talker` and `Listener` examples above) inside `my_python_pkg/my_python_pkg/`.
4.  **Update `setup.py`:** Add entry points for your executables.
    ```python
    from setuptools import find_packages, setup

    package_name = 'my_python_pkg'

    setup(
        name=package_name,
        version='0.0.0',
        packages=find_packages(exclude=['test']),
        data_files=[
            ('share/' + package_name, ['package.xml']),
            ('share/' + package_name + '/launch', ['launch/my_launch_file.py']),
        ],
        install_requires=['setuptools'],
        zip_safe=True,
        maintainer='your_name',
        maintainer_email='your_email@example.com',
        description='TODO: Package description',
        license='TODO: License declaration',
        tests_require=['pytest'],
        entry_points={
            'console_scripts': [
                'talker = my_python_pkg.talker_node:main',
                'listener = my_python_pkg.listener_node:main',
            ],
        },
    )
    ```
5.  **Build and Source:**
    ```bash
    cd ~/ros2_ws
    colcon build
    source install/setup.bash
    ```
6.  **Run Nodes:**
    ```bash
    ros2 run my_python_pkg talker
    ros2 run my_python_pkg listener
    ```

## Exercises
1.  Explain the key differences between ROS 2 topics, services, and actions. When would you use each communication pattern?
2.  Create a simple ROS 2 Python package that publishes a `sensor_msgs/msg/BatteryState` message to a topic named `/battery_status` every 2 seconds. Another node should subscribe to this topic and print the battery percentage.
3.  Describe the purpose of a ROS 2 workspace and the role of the `colcon build` command. What happens when you `source install/setup.bash`?
4.  How does ROS 2 facilitate modularity in robot software development? Provide an example of a complex robotic task and how it could be broken down into multiple ROS 2 nodes.
5.  Research and discuss how ROS 2 handles Quality of Service (QoS) settings. Why are QoS settings important for different types of robotic communication (e.g., sensor data vs. command signals)?
