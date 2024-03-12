

export const calculateColorByCommits = (commits) => { 
    const colors = {
      '--darkest': eval(commits >= 63 /* && commits < 84 */),
      '--darker': eval(commits >= 42 && commits < 62),
      '--base': eval(commits >= 21 && commits < 41),
      '--lighter': eval(commits >= 1 && commits < 21),
      '--lightest': eval(commits === 0),
    }

    return Object.keys(colors).find(key => colors[key])
  }