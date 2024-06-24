using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class FriendSystem : MonoBehaviour
{
    public List<string> friends;
    public InputField friendInput;
    public Text friendsList;

    void Start()
    {
        friends = new List<string>();
    }

    public void AddFriend()
    {
        string newFriend = friendInput.text;
        if (!friends.Contains(newFriend))
        {
            friends.Add(newFriend);
            UpdateFriendsList();
        }
    }

    void UpdateFriendsList()
    {
        friendsList.text = string.Join("\n", friends);
    }
}

