import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import debug from 'debug';
import simpleGit from 'simple-git';

export default class ResetBranches extends Command {
  ddebug: debug.Debugger = debug('newrade:core-cli:reset-branches');
  ddebugWarn: debug.Debugger = debug('newrade:core-cli:reset-branches:warn');
  ddebugError: debug.Debugger = debug('newrade:core-cli:reset-branches:error');

  static description = 'delete local branches that are merged on the origin';

  static examples = [`$ nr resetbranches`];

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [{ name: 'file' }];

  async init() {}

  async run() {
    const git = simpleGit();

    this.ddebug('looking for local branches to remove');

    const localBranches = await git.branchLocal();
    this.ddebug(`local branches: ${localBranches.all.map((branch) => chalk.blueBright(branch))}`);

    const ignoredBranches = ['dev', 'master', 'release'];
    this.ddebug(`ignored: ${ignoredBranches.map((branch) => chalk.blueBright(branch))}`);

    const mergedToMasterBranches = await git.branch(['--merged', 'master']);
    this.ddebug(`branches merged on master: ${mergedToMasterBranches.all}`);

    const localBranchesToBeDeleted = localBranches.all
      .filter((localBranch) => mergedToMasterBranches.all.includes(localBranch))
      .filter((branch) => !ignoredBranches.includes(branch));
    this.ddebug(
      `to remove: ${
        localBranchesToBeDeleted.length
          ? localBranchesToBeDeleted.map((branch) => chalk.red(branch))
          : '[]'
      }`
    );

    if (!localBranchesToBeDeleted.length) {
      this.ddebug(`no branches to remove ✅`);
      return;
    }

    localBranchesToBeDeleted.map(async (branchToRemove) => {
      this.ddebug(`removing ${branchToRemove}`);
      const removed = await git.branch([`-d`, branchToRemove]);
    });

    // bash sucks 👎
    // spawnSync(`git branch --merged master | grep -v '^[ *]*master$' | xargs git branch -d`, {
    //   cwd: '.',
    //   shell: true,
    //   stdio: 'inherit',
    //   env: process.env,
    // });
  }
}
