/**
 * Git コマンドシミュレーター
 * 仮想的な Linux ターミナルと Git 環境をシミュレートする
 * 状態（ファイル、ステージング、コミット、ブランチ）を保持し、リアルな出力を返す
 */

interface GitCommit {
  hash: string;
  message: string;
  timestamp: number;
  files: string[];
}

interface GitState {
  initialized: boolean;
  workingDir: Map<string, string>;
  stagingArea: Set<string>;
  untrackedFiles: Set<string>;
  modifiedFiles: Set<string>;
  commits: GitCommit[];
  branches: Map<string, number>;
  currentBranch: string;
  cwd: string;
  remotes: Map<string, string>;
  userName: string;
  userEmail: string;
}

function createInitialState(): GitState {
  return {
    initialized: false,
    workingDir: new Map(),
    stagingArea: new Set(),
    untrackedFiles: new Set(),
    modifiedFiles: new Set(),
    commits: [],
    branches: new Map([['main', -1]]),
    currentBranch: 'main',
    cwd: '~/my-project',
    remotes: new Map(),
    userName: 'あなたの名前',
    userEmail: 'you@example.com',
  };
}

function randomHash(): string {
  return Math.random().toString(16).slice(2, 9);
}

function parseQuotedArgs(parts: string[]): string[] {
  const result: string[] = [];
  let current = '';
  let inQuote = false;
  let quoteChar = '';
  for (const part of parts) {
    if (!inQuote) {
      if ((part.startsWith('"') || part.startsWith("'")) && !part.endsWith(part[0])) {
        inQuote = true;
        quoteChar = part[0];
        current = part.slice(1);
      } else if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
        result.push(part.slice(1, -1));
      } else {
        result.push(part);
      }
    } else {
      if (part.endsWith(quoteChar)) {
        current += ' ' + part.slice(0, -1);
        result.push(current);
        current = '';
        inQuote = false;
      } else {
        current += ' ' + part;
      }
    }
  }
  if (current) result.push(current);
  return result;
}

function executeCommand(state: GitState, line: string): { output: string; state: GitState } {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return { output: '', state };

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];

  if (cmd === 'git') return handleGit(state, parts.slice(1), trimmed);
  if (cmd === 'mkdir') {
    const dir = parts[1];
    if (dir) {
      if (parts.includes('-p')) {
        // ネストされたディレクトリを作成
        return { output: '', state };
      }
      return { output: '', state };
    }
    return { output: 'mkdir: missing operand', state };
  }
  if (cmd === 'touch') {
    const filename = parts[1];
    if (!filename) return { output: 'touch: missing file operand', state };
    if (!state.workingDir.has(filename)) {
      state.workingDir.set(filename, '');
      state.untrackedFiles.add(filename);
    }
    return { output: '', state };
  }
  if (cmd === 'echo') {
    const gtIdx = parts.indexOf('>');
    const appendIdx = parts.indexOf('>>');
    if (appendIdx > -1) {
      const file = parts[appendIdx + 1];
      const contentParts = parts.slice(1, appendIdx);
      const content = contentParts.join(' ').replace(/^["']|["']$/g, '');
      const existing = state.workingDir.get(file) || '';
      state.workingDir.set(file, existing + content + '\n');
      if (!state.stagingArea.has(file) && !state.untrackedFiles.has(file)) {
        if (state.commits.some(c => c.files.includes(file))) {
          state.modifiedFiles.add(file);
        } else {
          state.untrackedFiles.add(file);
        }
      } else if (state.stagingArea.has(file)) {
        state.modifiedFiles.add(file);
      }
      return { output: '', state };
    }
    if (gtIdx > -1) {
      const file = parts[gtIdx + 1];
      const contentParts = parts.slice(1, gtIdx);
      const content = contentParts.join(' ').replace(/^["']|["']$/g, '');
      const wasTracked = state.commits.some(c => c.files.includes(file));
      state.workingDir.set(file, content + '\n');
      if (!state.stagingArea.has(file) && !state.untrackedFiles.has(file)) {
        if (wasTracked) {
          state.modifiedFiles.add(file);
        } else {
          state.untrackedFiles.add(file);
        }
      } else if (state.stagingArea.has(file)) {
        state.modifiedFiles.add(file);
      }
      return { output: '', state };
    }
    return { output: parts.slice(1).join(' ').replace(/^["']|["']$/g, ''), state };
  }
  if (cmd === 'cat') {
    const file = parts[1];
    if (!file) return { output: 'cat: missing file operand', state };
    const content = state.workingDir.get(file);
    return { output: content !== undefined ? content.trimEnd() : `cat: ${file}: No such file or directory`, state };
  }
  if (cmd === 'ls') {
    const files = Array.from(state.workingDir.keys());
    return { output: files.length > 0 ? files.join('  ') : '', state };
  }
  if (cmd === 'cd') {
    const target = parts[1] || '~';
    if (target.startsWith('/') || target.startsWith('~')) {
      state.cwd = target;
    } else if (target === '..') {
      const cwdParts = state.cwd.split('/');
      if (cwdParts.length > 1) cwdParts.pop();
      state.cwd = cwdParts.join('/') || '~';
    } else {
      state.cwd = state.cwd + '/' + target;
    }
    return { output: '', state };
  }
  if (cmd === 'pwd') {
    return { output: state.cwd, state };
  }
  if (cmd === 'rm') {
    const target = parts[parts.length - 1];
    if (target && target !== '-r' && target !== '-rf') {
      state.workingDir.delete(target);
      state.untrackedFiles.delete(target);
      state.stagingArea.delete(target);
      state.modifiedFiles.delete(target);
    }
    return { output: '', state };
  }
  if (cmd === 'cp') {
    const src = parts[1];
    const dst = parts[2];
    if (src && dst && state.workingDir.has(src)) {
      state.workingDir.set(dst, state.workingDir.get(src) || '');
      state.untrackedFiles.add(dst);
    }
    return { output: '', state };
  }
  if (cmd === 'mv') {
    const src = parts[1];
    const dst = parts[2];
    if (src && dst && state.workingDir.has(src)) {
      state.workingDir.set(dst, state.workingDir.get(src) || '');
      state.workingDir.delete(src);
      state.untrackedFiles.delete(src);
      state.stagingArea.delete(src);
      state.untrackedFiles.add(dst);
    }
    return { output: '', state };
  }
  if (cmd === 'node') {
    if (parts[1] === '--version' || parts[1] === '-v') {
      return { output: 'v20.11.0', state };
    }
    return { output: '', state };
  }
  if (cmd === 'npm') {
    if (parts[1] === '--version' || parts[1] === '-v') {
      return { output: '10.2.4', state };
    }
    if (parts[1] === 'install' || parts[1] === 'i') {
      return { output: 'added 1 package in 1s', state };
    }
    if (parts[1] === 'start') {
      return { output: 'Starting development server...', state };
    }
    return { output: '', state };
  }
  if (cmd === 'npx') {
    return { output: '', state };
  }
  if (cmd === 'ssh-keygen') {
    return { output: 'Generating public/private ed25519 key pair.\nYour identification has been saved in ~/.ssh/id_ed25519\nYour public key has been saved in ~/.ssh/id_ed25519.pub', state };
  }
  if (cmd === 'ssh') {
    if (parts[1] === '-T' && parts[2] === 'git@github.com') {
      return { output: `Hi ${state.userName}! You've successfully authenticated, but GitHub does not provide shell access.`, state };
    }
    return { output: '', state };
  }
  if (cmd === 'gh') {
    return handleGh(parts.slice(1));
  }
  if (cmd === 'code' || cmd === 'cursor') {
    return { output: '', state };
  }
  if (cmd === 'brew') {
    if (parts[1] === 'install') {
      return { output: `==> Installing ${parts[2] || 'package'}...done`, state };
    }
    return { output: '', state };
  }
  if (cmd === 'sudo') {
    // sudo は無視して残りのコマンドを実行
    return executeCommand(state, parts.slice(1).join(' '));
  }
  if (cmd === 'apt') {
    if (parts[1] === 'update') {
      return { output: 'Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease\nReading package lists... Done', state };
    }
    if (parts[1] === 'install') {
      return { output: `Setting up ${parts[2] || 'package'}...done`, state };
    }
    return { output: '', state };
  }
  if (cmd === 'wsl') {
    if (parts.includes('--install')) {
      return { output: 'Installing: Ubuntu\nInstallation completed successfully.', state };
    }
    if (parts.includes('--list')) {
      return { output: '  NAME      STATE           VERSION\n* Ubuntu    Running         2', state };
    }
    return { output: '', state };
  }
  if (cmd === 'chmod') {
    return { output: '', state };
  }
  if (cmd === 'nano') {
    return { output: '', state };
  }
  if (cmd === 'source') {
    return { output: '', state };
  }
  if (cmd === 'claude') {
    if (parts[1] === '--version') {
      return { output: '1.0.12', state };
    }
    return { output: '> Claude Code が起動しました', state };
  }
  if (cmd === 'gemini') {
    return { output: '> Gemini CLI が起動しました', state };
  }

  return { output: `bash: ${cmd}: command not found`, state };
}

function handleGh(args: string[]): { output: string; state: GitState } {
  // gh は状態を変えないシミュレーション
  const state = createInitialState(); // ダミー
  const sub = args[0];
  if (sub === 'auth') {
    if (args[1] === 'login') {
      return { output: '! First copy your one-time code: ABCD-1234\n- Press Enter to open github.com in your browser...\n✓ Authentication complete.', state };
    }
    return { output: '', state };
  }
  if (sub === 'repo') {
    if (args[1] === 'create') {
      return { output: `✓ Created repository ${args[2] || 'my-project'} on GitHub`, state };
    }
    if (args[1] === 'clone') {
      return { output: `Cloning into '${args[2] || 'repo'}'...done.`, state };
    }
    return { output: '', state };
  }
  if (sub === 'pr') {
    if (args[1] === 'create') {
      return { output: 'Creating pull request...\nhttps://github.com/user/repo/pull/1', state };
    }
    if (args[1] === 'merge') {
      return { output: '✓ Merged pull request', state };
    }
    if (args[1] === 'view') {
      return { output: 'title: Feature update\nstate: OPEN\nauthor: user', state };
    }
    return { output: '', state };
  }
  if (sub === 'issue') {
    if (args[1] === 'create') {
      return { output: 'Creating issue...\nhttps://github.com/user/repo/issues/1', state };
    }
    if (args[1] === 'list') {
      return { output: 'No open issues', state };
    }
    return { output: '', state };
  }
  if (sub === '--version') {
    return { output: 'gh version 2.40.0', state };
  }
  return { output: '', state };
}

function handleGit(state: GitState, args: string[], _fullLine: string): { output: string; state: GitState } {
  const sub = args[0];

  if (!sub) {
    return { output: 'usage: git [--version] [--help] <command> [<args>]', state };
  }

  switch (sub) {
    case '--version': {
      return { output: 'git version 2.43.0', state };
    }
    case 'init': {
      state.initialized = true;
      return { output: `Initialized empty Git repository in ${state.cwd}/.git/`, state };
    }
    case 'config': {
      if (args.includes('--global') || args.includes('--local') || args.length >= 3) {
        const keyIdx = args.findIndex(a => a === 'user.name' || a === 'user.email' || a === 'core.sshCommand');
        if (keyIdx > -1) {
          const key = args[keyIdx];
          const valueArgs = args.slice(keyIdx + 1);
          if (valueArgs.length > 0) {
            const value = valueArgs.join(' ').replace(/^["']|["']$/g, '');
            if (key === 'user.name') state.userName = value;
            if (key === 'user.email') state.userEmail = value;
            return { output: '', state };
          } else {
            // 値なし = 取得
            if (key === 'user.name') return { output: state.userName, state };
            if (key === 'user.email') return { output: state.userEmail, state };
          }
        }
        if (args.includes('--list') || args.includes('-l')) {
          return { output: `user.name=${state.userName}\nuser.email=${state.userEmail}\ncore.editor=vim`, state };
        }
      }
      if (args[1] === '--list' || args[1] === '-l') {
        return { output: `user.name=${state.userName}\nuser.email=${state.userEmail}\ncore.editor=vim`, state };
      }
      return { output: '', state };
    }
    case 'add': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      const target = args[1];
      if (!target) return { output: 'Nothing specified, nothing added.', state };
      if (target === '.' || target === '-A' || target === '--all') {
        state.untrackedFiles.forEach(f => state.stagingArea.add(f));
        state.modifiedFiles.forEach(f => state.stagingArea.add(f));
        state.workingDir.forEach((_, f) => {
          if (!state.stagingArea.has(f)) state.stagingArea.add(f);
        });
        state.untrackedFiles.clear();
        state.modifiedFiles.clear();
      } else if (state.workingDir.has(target)) {
        state.stagingArea.add(target);
        state.untrackedFiles.delete(target);
        state.modifiedFiles.delete(target);
      } else {
        return { output: `fatal: pathspec '${target}' did not match any files`, state };
      }
      return { output: '', state };
    }
    case 'status': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      let out = `On branch ${state.currentBranch}\n`;
      if (state.commits.length === 0) out += 'No commits yet\n';
      if (state.stagingArea.size > 0) {
        out += '\nChanges to be committed:\n';
        out += '  (use "git restore --staged <file>..." to unstage)\n';
        state.stagingArea.forEach(f => {
          const isNew = !state.commits.some(c => c.files.includes(f));
          out += isNew ? `\tnew file:   ${f}\n` : `\tmodified:   ${f}\n`;
        });
      }
      if (state.modifiedFiles.size > 0) {
        out += '\nChanges not staged for commit:\n';
        out += '  (use "git add <file>..." to update what will be committed)\n';
        state.modifiedFiles.forEach(f => { out += `\tmodified:   ${f}\n`; });
      }
      if (state.untrackedFiles.size > 0) {
        out += '\nUntracked files:\n';
        out += '  (use "git add <file>..." to include in what will be committed)\n';
        state.untrackedFiles.forEach(f => { out += `\t${f}\n`; });
      }
      if (state.stagingArea.size === 0 && state.untrackedFiles.size === 0 && state.modifiedFiles.size === 0) {
        out += 'nothing to commit, working tree clean\n';
      }
      return { output: out.trimEnd(), state };
    }
    case 'commit': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      if (state.stagingArea.size === 0) return { output: 'nothing to commit, working tree clean', state };
      const mIdx = args.indexOf('-m');
      let message = 'commit';
      if (mIdx > -1) {
        const msgParts = args.slice(mIdx + 1);
        message = parseQuotedArgs(msgParts).join(' ').replace(/^["']|["']$/g, '');
      }
      const hash = randomHash();
      const files = Array.from(state.stagingArea);
      state.commits.push({ hash, message, timestamp: Date.now(), files });
      state.branches.set(state.currentBranch, state.commits.length - 1);
      const fileCount = state.stagingArea.size;
      state.stagingArea.clear();
      return { output: `[${state.currentBranch} ${hash}] ${message}\n ${fileCount} file(s) changed`, state };
    }
    case 'log': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      if (state.commits.length === 0) return { output: 'fatal: your current branch does not have any commits yet', state };
      const isOneline = args.includes('--oneline');
      const nIdx = args.indexOf('-n');
      let limit = state.commits.length;
      if (nIdx > -1 && args[nIdx + 1]) {
        limit = Math.min(parseInt(args[nIdx + 1], 10) || limit, limit);
      }
      const commitsToShow = state.commits.slice().reverse().slice(0, limit);
      const out = commitsToShow.map((c, i) => {
        if (isOneline) return `${c.hash} ${c.message}`;
        const isHead = i === 0;
        return `commit ${c.hash}${isHead ? ` (HEAD -> ${state.currentBranch})` : ''}\nAuthor: ${state.userName} <${state.userEmail}>\n\n    ${c.message}\n`;
      }).join('\n');
      return { output: out, state };
    }
    case 'branch': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      if (args.length === 1 || args[1] === undefined) {
        const out = Array.from(state.branches.keys()).map(b =>
          b === state.currentBranch ? `* ${b}` : `  ${b}`
        ).join('\n');
        return { output: out, state };
      }
      if (args[1] === '-d' || args[1] === '-D') {
        const name = args[2];
        if (!name) return { output: 'fatal: branch name required', state };
        if (name === state.currentBranch) return { output: `error: Cannot delete branch '${name}' checked out at '${state.cwd}'`, state };
        if (!state.branches.has(name)) return { output: `error: branch '${name}' not found.`, state };
        state.branches.delete(name);
        return { output: `Deleted branch ${name}.`, state };
      }
      if (args[1] === '-a') {
        const out = Array.from(state.branches.keys()).map(b =>
          b === state.currentBranch ? `* ${b}` : `  ${b}`
        ).join('\n');
        const remoteOut = Array.from(state.remotes.keys()).map(r =>
          `  remotes/${r}/main`
        ).join('\n');
        return { output: out + (remoteOut ? '\n' + remoteOut : ''), state };
      }
      // ブランチ作成
      const newBranch = args[1];
      const currentCommitIdx = state.branches.get(state.currentBranch) ?? -1;
      state.branches.set(newBranch, currentCommitIdx);
      return { output: '', state };
    }
    case 'checkout': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      if (args[1] === '-b') {
        const newBranch = args[2];
        if (!newBranch) return { output: 'fatal: You must specify a branch name', state };
        const currentCommitIdx = state.branches.get(state.currentBranch) ?? -1;
        state.branches.set(newBranch, currentCommitIdx);
        state.currentBranch = newBranch;
        return { output: `Switched to a new branch '${newBranch}'`, state };
      }
      const target = args[1];
      if (!target) return { output: 'error: pathspec missing', state };
      if (state.branches.has(target)) {
        state.currentBranch = target;
        return { output: `Switched to branch '${target}'`, state };
      }
      return { output: `error: pathspec '${target}' did not match any file(s) known to git`, state };
    }
    case 'switch': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      if (args[1] === '-c') {
        const newBranch = args[2];
        if (!newBranch) return { output: 'fatal: You must specify a branch name', state };
        const currentCommitIdx = state.branches.get(state.currentBranch) ?? -1;
        state.branches.set(newBranch, currentCommitIdx);
        state.currentBranch = newBranch;
        return { output: `Switched to a new branch '${newBranch}'`, state };
      }
      const target = args[1];
      if (!target) return { output: 'fatal: missing branch or commit argument', state };
      if (state.branches.has(target)) {
        state.currentBranch = target;
        return { output: `Switched to branch '${target}'`, state };
      }
      return { output: `fatal: invalid reference: ${target}`, state };
    }
    case 'remote': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      if (args[1] === 'add') {
        const name = args[2];
        const url = args[3];
        if (name && url) {
          state.remotes.set(name, url);
          return { output: '', state };
        }
        return { output: 'usage: git remote add <name> <url>', state };
      }
      if (args[1] === '-v') {
        const out = Array.from(state.remotes.entries()).map(([name, url]) =>
          `${name}\t${url} (fetch)\n${name}\t${url} (push)`
        ).join('\n');
        return { output: out || '', state };
      }
      if (args.length === 1) {
        return { output: Array.from(state.remotes.keys()).join('\n'), state };
      }
      return { output: '', state };
    }
    case 'push': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      let remote = 'origin';
      let branch = state.currentBranch;
      const remaining = args.slice(1).filter(a => !a.startsWith('-'));
      if (remaining[0]) remote = remaining[0];
      if (remaining[1]) branch = remaining[1];
      if (!state.remotes.has(remote)) return { output: `fatal: '${remote}' does not appear to be a git repository\nfatal: Could not read from remote repository.`, state };
      const count = state.commits.length;
      return { output: `Enumerating objects: ${count + 3}, done.\nCounting objects: 100% (${count + 3}/${count + 3}), done.\nWriting objects: 100% (${count + 3}/${count + 3}), done.\nTo ${state.remotes.get(remote)}\n * [new branch]      ${branch} -> ${branch}`, state };
    }
    case 'pull': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      return { output: 'Already up to date.', state };
    }
    case 'fetch': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      return { output: '', state };
    }
    case 'clone': {
      const url = args[1] || '';
      const dirName = url.split('/').pop()?.replace('.git', '') || 'repo';
      state.initialized = true;
      state.remotes.set('origin', url);
      state.cwd = state.cwd + '/' + dirName;
      return { output: `Cloning into '${dirName}'...\nremote: Enumerating objects: 42, done.\nremote: Counting objects: 100% (42/42), done.\nremote: Compressing objects: 100% (30/30), done.\nReceiving objects: 100% (42/42), 8.5 KiB | 8.5 MiB/s, done.`, state };
    }
    case 'diff': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      if (args[1] === '--staged' || args[1] === '--cached') {
        if (state.stagingArea.size === 0) return { output: '', state };
        return {
          output: Array.from(state.stagingArea).map(f =>
            `diff --git a/${f} b/${f}\n--- a/${f}\n+++ b/${f}\n@@ -0,0 +1 @@\n+${(state.workingDir.get(f) || '').trimEnd()}`
          ).join('\n'),
          state,
        };
      }
      if (state.modifiedFiles.size > 0) {
        return {
          output: Array.from(state.modifiedFiles).map(f =>
            `diff --git a/${f} b/${f}\n--- a/${f}\n+++ b/${f}\n@@ -1 +1 @@\n+${(state.workingDir.get(f) || '').trimEnd()}`
          ).join('\n'),
          state,
        };
      }
      return { output: '', state };
    }
    case 'merge': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      const branchName = args[1];
      if (!branchName) return { output: 'fatal: No branch name specified', state };
      if (!state.branches.has(branchName)) return { output: `merge: ${branchName} - not something we can merge`, state };
      return { output: `Merge made by the 'ort' strategy.\n 1 file changed, 1 insertion(+)`, state };
    }
    case 'stash': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      if (args[1] === 'pop') {
        return { output: 'On branch main\nChanges restored.', state };
      }
      return { output: `Saved working directory and index state WIP on ${state.currentBranch}`, state };
    }
    case 'restore': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      if (args[1] === '--staged') {
        const file = args[2];
        if (file) {
          state.stagingArea.delete(file);
          state.untrackedFiles.add(file);
        }
      }
      return { output: '', state };
    }
    case 'reset': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      return { output: '', state };
    }
    case 'show': {
      if (!state.initialized) return { output: 'fatal: not a git repository (or any of the parent directories): .git', state };
      if (state.commits.length === 0) return { output: 'fatal: bad default revision', state };
      const latest = state.commits[state.commits.length - 1];
      return { output: `commit ${latest.hash} (HEAD -> ${state.currentBranch})\nAuthor: ${state.userName} <${state.userEmail}>\n\n    ${latest.message}`, state };
    }
    default:
      return { output: `git: '${sub}' is not a git command. See 'git --help'.`, state };
  }
}

/**
 * 複数行のコマンドテキストを実行し、ターミナル出力を返す
 */
export function runCommands(input: string): string {
  let state = createInitialState();
  const lines = input.split('\n');
  const outputLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) { outputLines.push(''); continue; }
    if (trimmed.startsWith('#')) {
      outputLines.push(`\x1b[90m${trimmed}\x1b[0m`);
      continue;
    }

    // プロンプト + コマンド表示
    outputLines.push(`\x1b[32m${state.cwd}\x1b[0m $ ${trimmed}`);

    const result = executeCommand(state, trimmed);
    state = result.state;
    if (result.output) outputLines.push(result.output);
  }

  return outputLines.join('\n');
}
