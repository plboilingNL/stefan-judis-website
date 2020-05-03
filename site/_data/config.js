module.exports = {
  contentTypeNames: { [process.env.CTF_POST_ID]: 'blogPost' },
  contentTypeSlugs: {
    [process.env.CTF_LANDING_PAGE_ID]: 'resources',
    [process.env.CTF_NOTE_ID]: 'notes',
    // TODO link blog posts to articles
    // renaming currently breaks analytics fetching
    [process.env.CTF_POST_ID]: 'blog',
    [process.env.CTF_PROJECT_ID]: 'projects',
    [process.env.CTF_SCREENCAST_ID]: 'smalltalk',
    [process.env.CTF_SHELL_COMMAND_ID]: 'commands',
    [process.env.CTF_TALK_ID]: 'talks',
    [process.env.CTF_TIL_ID]: 'today-i-learned',
    [process.env.CTF_TOPIC_ID]: 'topics'
  }
};
