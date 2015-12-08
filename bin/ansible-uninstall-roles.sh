#!/bin/bash

set -e
ansible-galaxy remove martinmicunda.common \
                      martinmicunda.iojs \
                      angstwad.docker_ubuntu \
                      franklinkim.docker-compose
