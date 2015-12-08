#!/bin/bash

set -e
ansible-galaxy install martinmicunda.common \
                       martinmicunda.iojs \
                       angstwad.docker_ubuntu \
                       franklinkim.docker-compose \
                       --force
