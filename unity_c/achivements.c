using UnityEngine;
using UnityEngine.UI;

public class AchievementSystem : MonoBehaviour
{
    public Text achievementText;

    void Start()
    {
        // Check and display achievements
    }

    public void AwardAchievement(string achievement)
    {
        achievementText.text = "Achievement Unlocked: " + achievement;
        // Save achievement to user profile
    }
}

