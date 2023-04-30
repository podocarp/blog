with import <nixpkgs> { };

pkgs.mkShell {
  nativeBuildInputs = [
    nodejs-19_x
    # nodePackages.firebase-tools
    nodePackages.vercel
    yarn
  ];
}
