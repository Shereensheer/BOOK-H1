---
sidebar_position: 4
---

import UrduTranslateButton from '@site/src/components/UrduTranslateButton';

<UrduTranslateButton />

# ROS 2 کی بنیادیں

## سیکھنے کے مقاصد
اس فصل کے آخر تک، طلباء مندرجہ ذیل کر سکیں گے:
- ROS 2 (Robot Operating System 2) کی بنیادی معماری کی وضاحت کریں۔
- ROS 2 کے تصورات کو سمجھیں اور استعمال کریں: نوڈز، ٹوپکس، سروسز، اور ایکشنز۔
- Python یا C++ میں ایک بنیادی ROS 2 پیکیج تخلیق کریں۔
- ROS 2 نوڈز کے درمیان سادہ پبلش/سبسکرائب کمیونیکیشن نافذ کریں۔
- ROS 2 ورک اسپیس بنانے کے لیے `colcon` اور نمائش کے لیے `rviz` کا استعمال کریں۔

## ROS 2 کا تعارف
ROS 2 (Robot Operating System 2) روبوٹ سافٹ ویئر لکھنے کے لیے ایک لچک دار فریم ورک ہے۔ یہ سافٹ ویئر ڈیولپرز کو کمپلیکس روبوٹ کے رویے کو مختلف قسم کے روبوٹکس پلیٹ فارم پر تخلیق کرنے میں مدد فراہم کرتا ہے۔ اس کے پہلے والے ROS 1 کے برعکس، ROS 2 کو متعدد روبوٹ سسٹم، حقیقی وقت کنٹرول، اور کام کے ماحول کی وسیع رینج کے لیے بہتری کے ساتھ ڈیزائن کیا گیا ہے۔

### جسمانی مصنوعی ذہانت کے لیے ROS 2 کیوں؟
ROS 2 مختلف ہارڈ ویئر اجزاء (سینسرز، ایکٹو ایٹرز) اور سافٹ ویئر ماڈیولز (ادراک، منصوبہ بندی، کنٹرول) کو جسمانی مصنوعی ذہانت اور ہیومنوائڈ روبوٹکس میں ضم کرنے کے لیے ایک معیاری، ماڈیولر، اور مضبوط مواصلاتی انفراسٹرکچر فراہم کرتا ہے۔ اس کی تقسیم شدہ نوعیت پیچیدہ سسٹم کی حمایت کرتی ہے، اور اس کا غنی ماحول ترقی کو تیز کرتا ہے۔

## ROS 2 کے بنیادی تصورات

### 1. نوڈز
ایک نوڈ ایک قابلِ اجرا عمل ہے جو کمپیوٹیشن کرتا ہے۔ ROS 2 میں، نوڈز روبوٹک سسٹم کے بنیادی اجزاء ہیں۔ ہر نوڈ کا مقصد ایک واحد، اچھی طرح وضاحت شدہ کام کے لیے ہونا چاہیے (جیسے، ایک کیمرہ ڈرائیور نوڈ، ایک نیویگیشن نوڈ، ایک موٹر کنٹرول نوڈ)۔

```python
# مثال: حد سے کم ROS 2 Python نوڈ
import rclpy
from rclpy.node import Node

class MinimalNode(Node):
    def __init__(self):
        super().__init__('minimal_node')
        self.get_logger().info('حد سے کم نوڈ شروع ہوا')

def main(args=None):
    rclpy.init(args=args)
    minimal_node = MinimalNode()
    rclpy.spin(minimal_node)
    minimal_node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### 2. ٹوپکس
ٹوپکس نوڈز کے لیے ڈیٹا (پیغامات) کو بے ترتیب طور پر کئی سے کئی کے انداز میں بھیجنے اور وصول کرنے کا سب سے عام طریقہ ہیں۔ ایک نوڈ کسی ٹوپک پر پیغامات کو *پبلش* کر سکتا ہے، اور دیگر نوڈز وہ ٹوپک کو *سبسکرائب* کر سکتے ہیں تاکہ ان پیغامات کو وصول کر سکیں۔

- **پبلشرز:** نوڈز جو پیغامات بھیجتے ہیں۔
- **سبسکرائبرز:** نوڈز جو پیغامات وصول کرتے ہیں۔
- **پیغامات:** ڈیٹا کی ساختیں جن کی قسمیں وضاحت شدہ ہوتی ہیں (جیسے، `std_msgs/msg/String`، `sensor_msgs/msg/LaserScan`)۔

```python
# مثال: ROS 2 Python پبلشر اور سبسکرائبر
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class Talker(Node):
    def __init__(self):
        super().__init__('talker')
        self.publisher_ = self.create_publisher(String, 'chatter', 10)
        timer_period = 0.5  # سیکنڈ
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'ہیلو ROS 2! {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'پبلش کر رہا ہے: "{msg.data}"')
        self.i += 1

class Listener(Node):
    def __init__(self):
        super().__init__('listener')
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10)
        self.subscription  # غیر استعمال شدہ متغیر کی وارننگ سے بچنے کے لیے

    def listener_callback(self, msg):
        self.get_logger().info(f'میں نے سنا: "{msg.data}"')

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

### 3. سروسز
سروسز ایک درخواست/جواب کمیونیکیشن ماڈل فراہم کرتے ہیں، جو جواب وصول ہونے تک بلاک ہونے والے ہم وقت کاموں کے لیے مناسب ہے۔ ایک نوڈ کسی سروس کو *ایڈورٹائز* کر سکتا ہے، اور دیگر نوڈز اس سروس کو *کال* کر سکتے ہیں۔

- **سرورز:** نوڈز جو ایک سروس فراہم کرتے ہیں۔
- **کلائنٹس:** نوڈز جو ایک سروس کی درخواست کرتے ہیں۔
- **سروس کی وضاحت:** درخواست اور جواب کے پیغام کی قسم کی وضاحت کرتی ہے۔

### 4. ایکشنز
ایکشنز طویل وقت تک جاری رہنے والے کاموں کے لیے ڈیزائن کیے گئے ہیں جن میں چھیڑ چھاڑ کے اہداف اور جاری فیڈ بیک شامل ہوتے ہیں۔ ان میں ایک ہدف (درخواست)، فیڈ بیک (مابین تازہ کاریاں)، اور ایک نتیجہ (آخری نتیجہ) شامل ہوتا ہے۔ ان کی تعمیر ٹوپکس اور سروسز پر مبنی ہوتی ہے۔

- **ایکشن سرورز:** نوڈز جو ایک ایکشن پیش کرتے ہیں۔
- **ایکشن کلائنٹس:** نوڈز جو ایک ایکشن کی درخواست کرتے ہیں۔
- **ایکشن کی وضاحت:** ہدف، فیڈ بیک، اور نتیجہ کے پیغام کی قسم کی وضاحت کرتا ہے۔

## ROS 2 ٹولز

### `colcon` بلڈ سسٹم
`colcon` ROS 2 کا بنیادی بلڈ ٹول ہے۔ یہ کوڈ کمپائل کرتا ہے، لائبریریز کو لنک کرتا ہے، اور پیکیج کو اجرا کے لیے تیار کرتا ہے۔ ایک ROS 2 ورک اسپیس پیکیجز کا ایک مجموعہ ہے جنہیں آپ اکٹھا بلڈ اور انسٹال کرنا چاہتے ہیں۔

```bash
# مثال: ایک ROS 2 ورک اسپیس کو بنانا
cd ~/ros2_ws # اپنی ورک اسپیس کے روٹ میں جائیں
source /opt/ros/humble/setup.bash # اپنی ROS 2 تنصیب کو ماخذ بنائیں
# ایک نیا پیکیج بنائیں (مثال، اگر پہلے سے نہیں بنا ہوا)
# ros2 pkg create --build-type ament_python my_robot_pkg
colcon build --packages-select my_robot_pkg
source install/setup.bash # بلڈنگ کے بعد ورک اسپیس کو ماخذ بنائیں
```

### `rviz` نمائش ٹول
`rviz` (ROS Visualization) روبوٹس، سینسرز، اور الگورتھم کے لیے ایک 3D نمائش ٹول ہے۔ یہ روبوٹ ماڈل (URDF)، سینسر ڈیٹا (پوائنٹ کلاؤڈ، تصاویر)، اور منصوبہ بندی کے نتائج کو دیکھنے کی اجازت دیتا ہے۔

*ڈائریم: روبوٹ ماڈل اور سینسر ڈیٹا کو دکھاتے ہوئے rviz کا سکرین شاٹ*

ربوٹ ماڈل کو لوڈ کرنے کے لیے rviz کو لانچ کریں:
```bash
# مثال: ربوٹ ماڈل کے ساتھ rviz کو لانچ کرنا
ros2 launch urdf_tutorial display.launch.py model:=src/my_robot_pkg/urdf/my_robot.urdf
rviz2
```

## ایک ROS 2 پیکیج اور ورک اسپیس تخلیق کرنا (صوری مثال)

1.  **ورک اسپیس بنائیں:**
    ```bash
    mkdir -p ~/ros2_ws/src
    cd ~/ros2_ws
    ```
2.  **ایک پیکیج بنائیں (Python):**
    ```bash
    cd src
    ros2 pkg create --build-type ament_python my_python_pkg
    ```
    یہ `package.xml`، `setup.py`، اور آپ کے Python ماڈیولز کے لیے ایک خالی `my_python_pkg` فولڈر کے ساتھ ایک `my_python_pkg` ڈائرکٹری تخلیق کرے گا۔
3.  **کوڈ شامل کریں:** اپنے Python نوڈز (جیسے اوپر `Talker` اور `Listener` کی مثالیں) کو `my_python_pkg/my_python_pkg/` کے اندر رکھیں۔
4.  **`setup.py` کو اپ ڈیٹ کریں:** اپنے قابلِ اجرا کے لیے اندراج کے اشاریے شامل کریں۔
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
        description='TODO: پیکیج کی تفصیل',
        license='TODO: لائسنس کا اعلان',
        tests_require=['pytest'],
        entry_points={
            'console_scripts': [
                'talker = my_python_pkg.talker_node:main',
                'listener = my_python_pkg.listener_node:main',
            ],
        },
    )
    ```
5.  **بلڈ اور ماخذ کریں:**
    ```bash
    cd ~/ros2_ws
    colcon build
    source install/setup.bash
    ```
6.  **نوڈز چلائیں:**
    ```bash
    ros2 run my_python_pkg talker
    ros2 run my_python_pkg listener
    ```

## مشقیں
1.  ROS 2 ٹوپکس، سروسز، اور ایکشنز کے درمیان کلیدی فروق کی وضاحت کریں۔ آپ ہر مواصلات کے نمونے کو کب استعمال کریں گے؟
2.  ایک سادہ ROS 2 Python پیکیج بنائیں جو ہر 2 سیکنڈ میں `/battery_status` نام کے ٹوپک پر ایک `sensor_msgs/msg/BatteryState` پیغام کو پبلش کرتا ہے۔ دوسرے نوڈ کو اس ٹوپک کو سبسکرائب کرنا چاہیے اور بیٹری کا فیصد چھاپنا چاہیے۔
3.  ROS 2 ورک اسپیس کا مقصد اور `colcon build` کمانڈ کا کردار کیا ہے؟ جب آپ `source install/setup.bash` کریں تو کیا ہوتا ہے؟
4.  ROS 2 روبوٹ سافٹ ویئر ترقی میں ماڈیولریٹ کو کیسے سہولت فراہم کرتا ہے؟ ایک پیچیدہ روبوٹک کام کی مثال دیں اور وضاحت کریں کہ اسے متعدد ROS 2 نوڈز میں کیسے توڑا جا سکتا ہے۔
5.  تحقیق کریں اور بات کریں کہ ROS 2 کوالٹی آف سروس (QoS) ترتیبات کو کیسے سنبھالتا ہے۔ QoS ترتیبات مختلف قسم کے روبوٹک مواصلات (جیسے، سینسر ڈیٹا بمقابلہ کمانڈ سگنلز) کے لیے کیوں اہم ہیں؟