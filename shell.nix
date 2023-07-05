with import <nixpkgs> { };

pkgs.mkShell {
  nativeBuildInputs = [
    nodejs
    # nodePackages.firebase-tools
    nodePackages.vercel
    yarn
  ];
}
