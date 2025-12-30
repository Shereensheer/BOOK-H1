---
sidebar_position: 5
---

import UrduTranslateButton from '@site/src/components/UrduTranslateButton';

<UrduTranslateButton />

# شبیہ سازی کی بنیادیں: گیزبو اور یونیٹی

## سیکھنے کے مقاصد
اس فصل کے آخر تک، طلباء مندرجہ ذیل کر سکیں گے:
- جسمانی مصنوعی ذہانت کی ترقی میں روبوٹ شبیہ سازی کے بنیادی کردار کو سمجھیں۔
- روبوٹکس شبیہ سازی کے لیے گیزبو کی بنیادی خصوصیات اور صلاحیتوں کی وضاحت کریں۔
- URDF کا استعمال کرتے ہوئے ایک سادہ روبوٹ ماڈل تخلیق کریں اور اسے گیزبو میں لوڈ کریں۔
- یونیٹی کو ایک روبوٹکس شبیہ سازی پلیٹ فارم کے طور پر کے ممکنہ فوائد کا جائزہ لیں۔
- مختلف شبیہ سازی کے ماحول کے فوائد اور نقصانات پر بات کریں۔

## روبوٹ شبیہ سازی کی اہمیت
روبوٹ شبیہ سازی جسمانی مصنوعی ذہانت اور ہیومنوائڈ روبوٹکس کی ترقی میں ایک لازمی ٹول ہے۔ یہ ایک محفوظ، قیمت سے متعلقہ، اور دوبارہ قابلِ تعمیل ماحول فراہم کرتا ہے تاکہ:
- **الگورتھم ٹیسٹ کریں:** مہنگے ہارڈ ویئر کو نقصان پہنچائے بغیر کنٹرول، ادراک، اور نیویگیشن الگورتھم کی ترقی اور ڈیبگ کریں۔
- **روبوٹس کو ڈیزائن اور درست کریں:** میکانیکل ڈیزائنز پر کام کریں اور جسمانی پروٹو ٹائپ بنانے سے پہلے کارکردگی کا جائزہ لیں۔
- **ڈیٹا تخلیق کریں:** مشین لرننگ ماڈلز کو تربیت دینے کے لیے مصنوعی ڈیٹا سیٹ تیار کریں، خاص طور پر ادراک کے کاموں کے لیے۔
- **ترقی کو تیز کریں:** حقیقی وقت سے تیز اور متوازی طور پر شبیہ سازی چلائیں۔

## گیزبو: ایک روبوٹکس سیمیولیٹر
گیزبو ایک طاقتور 3D روبوٹکس سیمیولیٹر ہے جسے ROS ماحول میں وسیع پیمانے پر استعمال کیا جاتا ہے۔ یہ پیچیدہ اندر اور باہر کے ماحول میں روبوٹ کی آبادیوں کی درست شبیہ سازی فراہم کرتا ہے۔ گیزبو ایک مضبوط فزکس انجن، زبردست گریفکس، اور سینسرز اور ایکٹو ایٹرز کے لیے انٹرفیسز فراہم کرتا ہے۔

### گیزبو کے بنیادی اجزاء
- **فزکس انجن:** حقیقی جسمانی تعاملات کا احاطہ کرتا ہے (جیسے، تصادم، گریویٹی، مٹان)۔ ODE، بُلیٹ، سِم بอดی، اور DART کی حمایت کرتا ہے۔
- **رینڈرنگ انجن:** روبوٹس اور ماحول کی حقیقی نمائش فراہم کرتا ہے۔
- **سینسرز:** مختلف سینسر اقسام کی شبیہ سازی کرتا ہے، بشمول کیمرے، گہرائی کے سینسرز (لیڈر، RGB-D)، IMU، اور رابطہ سینسرز۔
- **پلگ انز:** گیزبو کی صلاحیت کو بڑھاتے ہیں، صارفین کو روبوٹ کے رویے، سینسر ماڈلز، اور دنیا کے م dynamics کو حسب ضرورت بنانے کی اجازت دیتا ہے۔

### URDF کے ساتھ روبوٹ ماڈلنگ
URDF (متحدہ روبوٹ تفصیل فارمیٹ) ایک XML فارمیٹ ہے جو ROS میں روبوٹ کے تمام عناصر کو بیان کرنے کے لیے استعمال کیا جاتا ہے۔ یہ روبوٹ کے kinematics (لنکس اور جوڑ) کو بیان کرتا ہے، dynamics، بصری ظہور، اور تصادم کی خصوصیات۔

```xml
<!-- مثال: ڈیفیرنیل ڈرائیو روبوٹ کے لیے سادہ URDF (صوری) -->
<robot name="my_diff_drive_robot">

  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.3 0.2 0.1"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.3 0.2 0.1"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.01"/>
    </inertial>
  </link>

  <link name="left_wheel_link">
    <visual>
      <geometry>
        <cylinder radius="0.05" length="0.02"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.05" length="0.02"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="0.1"/>
      <inertia ixx="0.0001" ixy="0.0" ixz="0.0" iyy="0.0001" iyz="0.0" izz="0.0001"/>
    </inertial>
  </link>

  <joint name="left_wheel_joint" type="continuous">
    <parent link="base_link"/>
    <child link="left_wheel_link"/>
    <origin xyz="0.1 0.1 0" rpy="1.5707 0 0"/>
    <axis xyz="0 0 1"/>
  </joint>

  <!-- ... right_wheel_link اور right_wheel_joint کے لیے مماثل ... -->

</robot>
```

### گیزبو میں URDF لوڈ کرنا
ایک بار جب URDF فائل تخلیق کر لی جائے، تو اسے `ros2 launch` اور گیزبو مخصوص لانچ فائل کا استعمال کرتے ہوئے گیزبو میں اسپون کیا جا سکتا ہے، جس میں اکثر `gazebo_ros` پیکیج سے `spawn_entity.py` اسکرپٹ کا حصہ ہوتا ہے۔

```bash
# گیزبو کے لیے تصوراتی ROS 2 لانچ فائل (my_robot_spawn.launch.py)
# یہ ایک ROS 2 پیکیج کا حصہ ہوگا، مثال کے طور پر، my_robot_description

import os
from ament_index_python.packages import get_package_share_directory
from launch import LaunchDescription
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from launch_ros.actions import Node

def generate_launch_description():
    # اپنے روبوٹ کی URDF فائل کا راستہ حاصل کریں
    pkg_share_dir = get_package_share_directory('my_robot_description')
    urdf_path = os.path.join(pkg_share_dir, 'urdf', 'my_diff_drive_robot.urdf')

    # گیزبو سرور اور کلائنٹ کو لانچ کریں
    gazebo_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(os.path.join(
            get_package_share_directory('gazebo_ros'), 'launch', 'gazebo.launch.py'))
    )

    # گیزبو میں روبوٹ کو اسپون کریں
    spawn_entity = Node(
        package='gazebo_ros',
        executable='spawn_entity.py',
        arguments=['-topic', 'robot_description', '-entity', 'my_diff_drive_robot'],
        output='screen',
    )

    # روبوٹ کی تفصیل کو شائع کریں (rviz وغیرہ کے لیے ضروری)
    robot_state_publisher_node = Node(
        package='robot_state_publisher',
        executable='robot_state_publisher',
        output='screen',
        parameters=[{'robot_description': urdf_path}]
    )

    return LaunchDescription([
        gazebo_launch,
        robot_state_publisher_node,
        spawn_entity,
    ])
```

## روبوٹکس شبیہ سازی کے لیے یونیٹی
یونیٹی، ایک طاقتور حقیقی وقت 3D ترقیاتی پلیٹ فارم، روبوٹکس شبیہ سازی کے لیے بڑھتے ہوئے استعمال میں ہے، خاص طور پر جب زبردست گریفکس، پیچیدہ ماحولیاتی تعاملات، یا انسان-روبوٹ تعامل کے منظر نامے اہم ہوں۔ یونیٹی کا ماحول تیز پروٹو ٹائپنگ اور مختلف پلیٹ فارم تک تیز رفتار کے لیے اجازت دیتا ہے۔

### روبوٹکس کے لیے کلیدی خصوصیات
- **زبردست گریفکس:** کمپیوٹر وژن ایپلی کیشنز اور انسان-میں-لوپ شبیہ سازی کے لیے حقیقی نمائش۔
- **فزکس انجن (PhysX):** جامد جسم کے dynamics، تصادم، اور جوڑ کی مضبوط شبیہ سازی۔
- **C# اسکرپٹنگ:** روبوٹ کے اجزاء اور شبیہ سازی کے منطق پر پروگرام کے ذریعے قابو پاننا۔
- **ROS-یونیٹی انضمام:** `ROS-TCP-Connector` اور `Unity-Robotics-Hub` جیسے پیکیج ROS 2 نوڈز اور یونیٹی شبیہ سازی کے درمیان بے داغ مواصلات کو ممکن بناتے ہیں۔

### تصوراتی یونیٹی-ROS 2 تعامل
یونیٹی میں، C# اسکرپٹس روبوٹ کے رویے کا انتظام کرتے ہیں۔ یہ اسکرپٹ مخصوص یونیٹی پیکیج کے ذریعے TCP کنکشن استعمال کرتے ہوئے بیرونی ROS 2 نوڈز کے ساتھ بات چیت کر سکتے ہیں۔

*ڈائریم: TCP کے ذریعے یونیٹی شبیہ سازی کے ساتھ ROS 2 نوڈ کی بات چیت کو دکھاتے ہوئے ورک فلو*

```csharp
// مثال: یونیٹی میں ROS 2 کو جوائنٹ اسٹیٹس شائع کرنے کے لیے تصوراتی C# اسکرپٹ
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;
using RosMessageTypes.Sensor;

public class JointStatePublisher : MonoBehaviour
{
    public string rosTopicName = "/joint_states";
    public float publishRate = 0.1f; // 10 ہرٹز

    private ROSConnection ros;
    private float timeElapsed;

    // فرض کریں کہ آپ کے روبوٹ جوڑ اس گیم آبجیکٹ کے بچے ہیں
    public ArticulationBody[] robotJoints;

    void Start()
    {
        ros = ROSConnection.GetOrCreateInstance();
        ros.RegisterPublisher<JointStateMsg>(rosTopicName);
    }

    void FixedUpdate()
    {
        timeElapsed += Time.deltaTime;
        if (timeElapsed > publishRate)
        {
            PublishJointStates();
            timeElapsed = 0;
        }
    }

    void PublishJointStates()
    {
        JointStateMsg jointState = new JointStateMsg();
        jointState.header.stamp = ros.rosTimeNow();
        jointState.name = new string[robotJoints.Length];
        jointState.position = new double[robotJoints.Length];
        jointState.velocity = new double[robotJoints.Length];

        for (int i = 0; i < robotJoints.Length; i++)
        {
            jointState.name[i] = robotJoints[i].name;
            jointState.position[i] = robotJoints[i].jointPosition[0]; // فرض کریں ریوولوٹ جوڑ
            jointState.velocity[i] = robotJoints[i].jointVelocity[0];
        }
        ros.Publish(rosTopicName, jointState);
    }
}
```

## شبیہ سازی کے ماحول کا موازنہ

| خصوصیت          | گیزبو                                 | یونیٹی                                     |
|------------------|----------------------------------------|-------------------------------------------|
| **اولین استعمال**  | روبوٹکس تحقیق، ROS انضمام     | گیم ترقی، زبردست ویژوئلز، VR/AR، وسیع صنعتی استعمال |
| **فزکس انجن** | متعدد (ODE، بُلیٹ، سِم بودی، DART) | PhysX                                     |
| **گریفکس**     | اچھی، کاروائی میں مفید                       | زبردست، بہت حسب ضرورت                     |
| **اسکرپٹنگ**    | C++، Python (پلگ انز)                  | C#                                        |
| **استعمال کی آسانی**  | نئے صارفین کے لیے سیکھنے کا مڑکا      | GUI کے ساتھ زیادہ قابلِ رسائی، لیکن جامد فزکس کے لیے پیچیدہ |
| **ماحول**    | مضبوط ROS انضمام، اوپن سورس    | بڑا ترقیاتی کمیونٹی، کمرشل ٹولز، وسیع اثاثہ اسٹور |

## مشقیں
1.  وضاحت کریں کہ پیچیدہ ہیومنوائڈ روبوٹس کی ترقی کے لیے روبوٹ شبیہ سازی کیوں اہم ہے۔ کم از کم تین الگ وضاحتیں فراہم کریں۔
2.  گیزبو میں URDF کے کردار کی وضاحت کریں۔ URDF فائل روبوٹ کے بارے میں کیا معلومات فراہم کرتی ہے؟
3.  تصور کریں کہ آپ کو اس طرح کے ماحول کی شبیہ سازی کے لیے کہنے جائیں کہ ایک ہیومنوائڈ روبوٹ گھر کی اشیاء کو تھامنے کے طریقے سیکھ رہا ہو۔ کیا آپ شروع میں گیزبو یا یونیٹی کا انتخاب کریں گے، اور کیوں؟ عوامل جیسے بصری حقیقت، فزکس کی درستی، اور AI/ML ٹولز کے ساتھ آسان انضمام پر غور کریں۔
4.  دو `box` لنکس کو جوڑنے والے ایک پریزمیٹک (لکیری) جوڑ کے لیے ایک سادہ URDF ٹکڑا لکھیں۔ دونوں لنکس اور جوڑ کی قسم، اصل، اور محور کے لیے ویژوئل، تصادم، اور جامد خصوصیات کی وضاحت کریں۔
5.  ROS 2 پر مبنی روبوٹ کنٹرول سٹیک کو یونیٹی شبیہ سازی ماحول کے ساتھ ضم کرنے میں ممکنہ چیلنجز پر چرچا کریں۔ ان چیلنجز کو کیسے overcome کیا جا سکتا ہے؟