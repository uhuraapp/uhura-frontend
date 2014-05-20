# Cache Keys

```
s:ids:$user_id              []int             // User's channels subscriptions
```

```
u:l:$channel_id:$user_id    int64             // User Channel's Episodes listened
```

```
c:$channel_id               ChannelEntity     // The Channel
```

```
c:e:$channel_id             []int             // The Channel's Episodes
```

```
s:$channel_id:$user_id      bool              // The Subscription Status
```

```
e:l:$episode_id:$user_id    []int             // The User's listened status
```
