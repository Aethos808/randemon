import packageJson from '@root/package.json';

export function VersionText() {
  return <div className="fixed bottom-4 right-4 text-sm text-gray-500 md:text-base">Version {packageJson.version}</div>;
}
