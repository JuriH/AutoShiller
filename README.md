# README

**AutoShiller** is a Twitter bot used for promoting your favourite project, and it does the following:
- Logs into Twitter with given login details
- Does a search for each of the items stored in an array, one by one
- Checks if a tweet is either posted by specific user or if the tweet's text contains any of the given items
- Likes and re-tweets a tweet when specific conditions are met
- Ignores your own tweets
- Logs each liked and/or re-tweeted tweet into a text file with timestamp and the tweet's URL
<br></br>
<br></br>
# How to use
Set up environment \(**.env**\) file in the root directory of the project  
Inside the environment file, add the following:  
<br></br>
If you want to see some additional console logs, change this to 1
```
DEV_LOG=0
```

```
TWITTER_EMAIL=your_twitter_email
TWITTER_USER=your_twitter_username
TWITTER_PASS=your_twitter_password
```

On Windows use **\\\\** to escape the single **\\** to choose a path for the log file
```
LOG_FILE_PATH=C:\\path\\to\\logFile.txt
```  
<br></br>
To set what to search for, change the content of the tags-array in **AutoShiller.js** file that is found in the project's root directory.  

For example:
<br></br>
```
const tags = ["@user", "#tag1", "#tag2", "someText"]
```
<br></br>
To set a specific user whom tweets to always like and re-tweet no matter if the tweet contains any of the given items in the tags-array, find the following:

```
// Check if tweet should be handled or not
const tweetText = await getTweetText(page)
const tweetStatus = await ifHandleTweet(
  page,
  tweetText,
  tags,
  `/${process.env.TWITTER_USER}`,
  "/the_happy_coin"
)
```

And then change **"/the_happy_coin"** to something else, keeping the single quotes and forward slash as it's used to detect a Twitter user.
