export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;

  return <div id={`${service}-root`} />;
}
