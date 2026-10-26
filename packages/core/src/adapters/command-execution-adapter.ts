/**
 * Command Execution Adapter for Creative Web Architect 2.0.
 *
 * Provides typed, boundary-enforced shell command execution with timeouts,
 * stdio capture, and mock implementations for testing.
 *
 * Created by Anas Hashim. Copyright © 2026 Anas Hashim. MIT License.
 */

import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

export interface CommandOptions {
  cwd?: string;
  timeoutMs?: number;
  env?: Record<string, string>;
}

export interface CommandResult {
  stdout: string;
  stderr: string;
  exitCode: number;
  durationMs: number;
  command: string;
}

export interface CommandExecutionAdapter {
  readonly id: string;
  isAvailable(): boolean;
  execute(command: string, options?: CommandOptions): Promise<CommandResult>;
}

/**
 * Node Process Command Execution Adapter.
 * Spawns real local sub-processes with timeout guards.
 */
export class NodeProcessCommandAdapter implements CommandExecutionAdapter {
  public readonly id = 'node-process-command';

  public isAvailable(): boolean {
    return typeof process !== 'undefined';
  }

  public async execute(command: string, options: CommandOptions = {}): Promise<CommandResult> {
    const startTime = Date.now();
    const timeout = options.timeoutMs ?? 30000;

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: options.cwd ?? process.cwd(),
        timeout,
        env: { ...process.env, ...options.env }
      });

      return {
        stdout: String(stdout).trim(),
        stderr: String(stderr).trim(),
        exitCode: 0,
        durationMs: Date.now() - startTime,
        command
      };
    } catch (err: any) {
      return {
        stdout: String(err.stdout || '').trim(),
        stderr: String(err.stderr || err.message || '').trim(),
        exitCode: typeof err.code === 'number' ? err.code : 1,
        durationMs: Date.now() - startTime,
        command
      };
    }
  }
}

/**
 * Mock Command Execution Adapter for Testing and Sandboxing.
 */
export class MockCommandAdapter implements CommandExecutionAdapter {
  public readonly id = 'mock-command';
  private responses = new Map<string, Partial<CommandResult>>();

  public isAvailable(): boolean {
    return true;
  }

  public registerResponse(commandMatch: string, result: Partial<CommandResult>): void {
    this.responses.set(commandMatch, result);
  }

  public async execute(command: string, options: CommandOptions = {}): Promise<CommandResult> {
    for (const [key, val] of this.responses.entries()) {
      if (command.includes(key)) {
        return {
          stdout: val.stdout ?? '',
          stderr: val.stderr ?? '',
          exitCode: val.exitCode ?? 0,
          durationMs: 5,
          command
        };
      }
    }

    return {
      stdout: `[mock-command] executed: ${command}`,
      stderr: '',
      exitCode: 0,
      durationMs: 5,
      command
    };
  }
}
