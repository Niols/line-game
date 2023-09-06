{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.05";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" ];

      perSystem = { pkgs, ... }: {
        packages.default = pkgs.stdenv.mkDerivation {
          name = "line-game";
          buildInputs = [ pkgs.nodejs_20 ];
          NODE_OPTIONS = "--openssl-legacy-provider";
        };
      };
    };
}
