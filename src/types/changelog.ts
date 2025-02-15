export interface ChangelogEntry {
  date: string
  action: 'added' | 'removed' | 'renamed'
  ticker: string
}
